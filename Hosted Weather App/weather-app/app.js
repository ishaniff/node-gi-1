// IMPORTING MY TWO LOCAL MODULES
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
// SETTING ADDRESS TO BE TAKEN IN FROM ARGUMENT VECTOR
const address = process.argv[2];
// CONDITONAL LOGIC TO CHECK FOR EXISTENCE (LOW LEVEL ERR HANDLING)
if (!address) {
  console.log("please provide an address");
} else {
  // IF ADD PROVIDED, ERROR IF NETWORK/API ISSUE, DESTRUCTURED DATA RESPONSE
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log(forecastData);
    });
  });
}
