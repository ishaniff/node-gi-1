const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

// Paths
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// Public directory to be served
app.use(express.static(publicPath));
// Express and handlebars configuration
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
// Express routes configuration
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Issiah Haniff",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Issiah Haniff",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Helpful Page",
    helpText: "Helpful text",
    name: "Issiah Haniff",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Error Page",
    name: "Issiah Haniff",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Error Page",
    name: "Issiah Haniff",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("server live on 3000");
});
