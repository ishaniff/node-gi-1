const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1da9067a2b6abd6c1dccf63a12dce46e&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service");
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees currently.`
      );
    }
  });
};
module.exports = forecast;
