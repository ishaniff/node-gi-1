const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(address) +
    "&access_token=pk.eyJ1IjoiaWRoYW5pZmYiLCJhIjoiY200cDV3Mmd4MDhobzJscHFiOHd2aGhwbiJ9.F9_k6dcKRnLtQRzFgXcvWw";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find locatiion. try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].properties.coordinates.latitude,
        longitude: body.features[0].properties.coordinates.longitude,
        location: body.features[0].properties.full_address,
      });
    }
  });
};
module.exports = geocode;
