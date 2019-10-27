'use strict';

// Import nessary packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Set up the appication
const app = express();
app.use(cors());

// Set Port and fall back
const PORT = process.env.PORT || 3003;


//Get the location and name to be used else where
app.get('/location', handleLocation);

//Create an array of the weather and return that to the webpage
app.get('/weather', handleWeather);


//404 all unwanted extentions
app.get('*', (request, responce) => {
  pathError(responce);
});


function handleLocation (request, response) {

  try {

    const location = request.query.data;
    const data = require('./data/geo.json');

    const cityData = new City(location, data);

    response.send(cityData);

  } catch (error) {
    serverError(response, error);
  }
}

function handleWeather (request, response) {

  try {

    const data = require('./data/darksky.json');

    const forcastList = data.daily.data.map(dailyWeather => new Forcast(dailyWeather));

    response.send(forcastList);

  } catch(error){
    serverError(response, error);
  }
}

// Constructor Functions
function City (location, data) {

  this.search_query = location;
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;

}

function Forcast (day) {

  this.forecast = day.summary;
  let date = new Date(day.time * 1000);
  this.time = date.toDateString();

}

function serverError (response, error) {
  response.status(500).send('Server Error');
  console.error(error);
}

function pathError (response, error) {
  response.status(404).send('404 Bad Pathway');
  console.error(error);
}

// Turn on the Server
app.listen(PORT, () => console.log(`App is on port ${PORT}`));