const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, nextPasses) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  for (const pass of nextPasses) {
    const time = new Date(0);
    const duration = pass.duration;

    time.setSeconds(pass.risetime);
    console.log(`Next pass at ${time} for ${duration} seconds!`);
  }
});

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