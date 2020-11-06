const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    const time = new Date(0);
    time.setUTCSeconds(pass.risetime);
    time.setHours(time.getHours() - 8);
    const duration = pass.duration;
    console.log(`Next pass at ${time} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, nextPasses) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(nextPasses);
});

module.exports = printPassTimes;

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('184.66.234.102', (error, data) => {

  console.log(error, data);

});

const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (error, nextPasses) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , nextPasses);
});
*/