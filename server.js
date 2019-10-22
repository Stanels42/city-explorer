'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`App is on port ${PORT}`));

app.get('/location', (request, responce) => {
  const location = request.query.data;
  const data = require('./data/geo.json');

  const city = new City(location, data)

  responce.send(city);
});

app.get('*', (request, responce) => {
  responce.status(404);
});

function City (location, data) {
  this.search_query = location;
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}
