import express from 'express'
import data from '../src/testData';

const router = express.Router();

const contests = data.contests.reduce((obj, contest) => {
  obj[contest.id] = contest;
  return obj;
}, {});

router.get('/contests', (req, res) => {
  res.send({ 
    contests: contests
  });
})

router.get('/contests/:contestId', (req, res) => {
  let contest = contests[req.params.contestId];
  contest.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet dapibus eros, a gravida quam. Fusce tincidunt purus nec laoreet elementum. Nulla ac ligula ligula. Donec accumsan vel mauris sed facilisis. Vivamus ac pulvinar dolor. Suspendisse tristique, tortor id pulvinar pulvinar, lacus sem porta arcu, sed imperdiet augue nisl a eros. Maecenas congue lectus lectus, id aliquam eros venenatis id. Fusce ac erat sit amet nisl commodo tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam tempus euismod mattis. Pellentesque massa nibh, consequat quis mauris vel, finibus porta ligula. \nDonec ac tellus tincidunt, interdum ligula sit amet, tristique diam. Nullam eu facilisis ligula. Cras convallis semper magna, molestie varius augue tincidunt id. Aenean placerat vehicula metus, id rutrum orci iaculis vel. Phasellus mi quam, dapibus sed odio nec, bibendum scelerisque tortor. Donec eu ultrices nulla. Nunc consequat metus tortor. Phasellus vitae lacus posuere, consectetur elit eu, ornare erat. Aliquam porttitor, ligula quis pretium vulputate, sem purus condimentum nibh, sed ultricies est magna nec justo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';
  res.send(contest);
})

export default router;
