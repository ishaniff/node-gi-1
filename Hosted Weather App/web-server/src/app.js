// MODULES BEING IMPORTED BOTH LOCALLY CREATED ONES BY ME AND ONES DOWNLOADED VIA NPM
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
// PATHS BEING SET TO BE DYNAMIC AND NOT HARD CODED STATIC THAT WILL LEAD TO PROBLEMS
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// CONFIGURING EXPRESS TO SERVE ALL THE FILES FROM HERE, THIS IS THE ROOT FOR THE HTML/CSS/JS FOR CLIENTSIDE
app.use(express.static(publicPath));
// MORE CONFIGURATION OF EXPRESS AND ALSO HBS, TELLING EXPRESS TO USE HBS AS THE VIEW ENGINE SO WE CAN UTILIZE TEMPLATES, NOW CAN USE HANDLEBARS TO RENDER PAGES DYNAMICALLY, SETTING THEM BOTH TO USE CUSTOM PATHS TO HAVE ONE TEMPLATES FOLDER WITH BOTH TEMPLATES AND PARTIALS
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
// CONFIGURING AND SETTING UP ROUTES FOR ALL THE TRAFFIC TO FLOW TO, RENDERING PAGES ON SERVER SIDE, LESS WORK ON CLIENT TO LOAD PAGE ??? I THINK
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
// ROUTE ERROR HANDLING SPECIFICALLY ON ANYTHING STARTING ON HELP, IF THERE WAS A BROKEN LINK THAT HASNT BEEN UPDATED ON HELP PAGE
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Error Page",
    name: "Issiah Haniff",
    errorMessage: "Help article not found.",
  });
});
// GENERAL EXPLICIT ALL WILDCARD ERROR HANDLING
app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Error Page",
    name: "Issiah Haniff",
    errorMessage: "Page not found.",
  });
});
// STARTING EXPRESS SERVER, SPECFICIALLY ON PORT 3000, CONSOLE LOG NOT NEEDED!
app.listen(3000, () => {
  console.log("server live on 3000");
});
