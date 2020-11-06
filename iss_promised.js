const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}?fields=lat,lon`);
};

const fetchISSFlyOverTimes = (body) => {
  const { lat, lon } = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

console.log(nextISSTimesForMyLocation());

module.exports = { nextISSTimesForMyLocation };
