'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`App is on port ${PORT}`));

//Get the location and name to be used else where
app.get('/location', (request, responce) => {
  const location = request.query.data;
  const data = require('./data/geo.json');

  const city = new City(location, data)

  responce.send(city);
});

//Create an array of the weather and return that to the webpage
app.get('/weather', (request, responce) => {

  const data = require('./data/darksky.json');
  const forcastList = [];

  data.daily.data.forEach(dailyWeather => {
    forcastList.push(new Forcast(dailyWeather));
  });

  responce.send(forcastList);
});

//404 all unwanted extentions
app.get('*', (request, responce) => {
  responce.status(404);
});

function City (location, data) {
  this.search_query = location;
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}

function Forcast (day) {
  this.forcast = day.summary;
  let date = new Date(day.time);
  this.time = date.toDateString();
}
