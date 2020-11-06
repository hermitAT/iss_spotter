const request = require("request");

const fetchMyIP = (callback) => {

  request("https://api.ipify.org?format=json", (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const IP = JSON.parse(body).ip;
    callback(null, IP);
  });
};

const fetchCoordsByIP = (ip, callback) => {

  request(`http://ip-api.com/json/${ip}?fields=lat,lon`, (error, response, body) => {

    const { lat, lon } = JSON.parse(body);

    if (error) {
      callback(error, null);
      return;
    }
    // trying to find a way to confirm it is invalid query as this site always displays statusCode 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const coordinates = { lat, lon };

    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = (coordinates, callback) => {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.lat}&lon=${coordinates.lon}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
};

// final callback waterfall

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) return callback(error, null);

      fetchISSFlyOverTimes(coordinates, (error, nextPasses) => {
        if (error) return callback(error, null);

        callback(null, nextPasses);

      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };