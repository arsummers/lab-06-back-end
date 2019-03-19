'use strict';

require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT;

app.get('./location', (request, response) => {
  const locationData = searchToLatLong(request.query.data)
  console.log('location', request.query.data);
  response.send(locationData);
});

//TEST ROUTE
app.get('/testing', (request, response) =>{
  console.log('hit the test route');
  let testObject = {name: 'test route'}
  response.json(testObject);
})

//turn the server on so it will listen
app.listen(PORT, () =>console.log(`listening on PORT ${PORT}`));

//Helper functions

function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(geoData);
  location.search_query = query;
  console.log('geo data location ', location);
  return location;
}

function Location(data) {
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}