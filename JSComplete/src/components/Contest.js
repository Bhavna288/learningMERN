import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Contest extends Component {
    render() {
        return(
            <div className="Contest">
                <div className="contest-description m-5">
                    {this.props.description}
                </div>
                <div className="link home-link m-5"
                    onClick="{this.props.contestLinkClick">
                    Contest page
                </div>
            </div>
        );
    }
}

Contest.propTypes = {
    description: PropTypes.string.isRequired,
    contestLinkClick: PropTypes.func.isRequired
}

export default Contest;