import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';
import PropTypes from 'prop-types';

const pushState = (obj, url) => 
    window.history.pushState(obj, '', url);

const onPopState = handler => {
    window.onpopstate = handler;
}

class App extends React.Component {
    static propTypes = {
        initialData: PropTypes.object.isRequired
    }
    state = this.props.initialData;
    componentDidMount() {
        onPopState((event) => {
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            })
        })
    }
    componentWillUnmount() {
        onPopState(null);
    }
    fetchContest = (contestId) => {
        // api.fetchContest(contestId)
        //     .then(contest => {
        //         this.setState({
        //             currentContestId: contest.id,
        //             contests: {
        //                 ...this.state.contests,
        //                 [contest.id]: contest
        //             }
        //         });
        //         pushState(
        //             { currentContestId: contestId},
        //             `/contest/${contestId}`
        //         )
        //     })
    }
    fetchContestList = () => {
        // console.log('called');
        api.fetchContestList()
            .then(contests => {
                this.setState({
                    currentContestId: null,
                    contests
                });
                pushState(
                    { currentContestId: null},
                    '/'
                );
            })
            .catch(console.error)
    }
    currentContest() {
        return this.state.contests[this.state.currentContestId];
    }
    pageHeader() {
        if(this.state.currentContestId) {
            return this.currentContest().contestName;
        }

        return 'Naming Contests';
    }
    currentContent() {
        if (this.state.currentContestId) {
            return <Contest {...this.currentContest()}
            contestLinkClick={this.fetchContestList} />;
        }
        return <ContestList
               onContestClick={this.fetchContest}
               contests={this.state.contests} />;
    }
    render() {
        return(
            <div className="App">
              <Header message={this.pageHeader()} />
              {this.currentContent()}
            </div>
        );
    }
}

export default App;