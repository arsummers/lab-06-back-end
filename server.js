'use strict';

require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT;

//path to location
app.get('/location', (request, response) => {
  console.log('request at 14', request.query);

  const locationData = searchToLatLong(request.query.data)
  console.log('location', request.query.data);
  response.send(locationData);
  response.status(500).send('Sorry, something went wrong');
});

//path to weather
app.get('/weather', (request, response)=>{
  console.log('hit the weather function');
  const weatherData = searchWeather(request.query.data)
  response.send(weatherData);
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
  console.log('location at 35', location);
  location.search_query = query;
  console.log('geo data location ', location);
  return location;
}

function Location(data) {
  console.log('got to constructor');
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}

function searchWeather(query) {
  const weatherArray=[];
  const darkSkyData = require('./data/darksky.json');
  console.log(darkSkyData.daily);
  darkSkyData.daily.data.forEach(day =>{
    weatherArray.push(new Weather(day));
  })
  console.log('weather Array', weatherArray);
  weatherArray.search_query = query;
  return weatherArray;
}

function Weather(weatherData){
  console.log('got to weather constructor');
  this.forecast = weatherData.summary;
  console.log('hi', this.forecast);
  let goodTime = weatherData.time;
  this.time= new Date(goodTime);
  console.log('hi', this.time);
}
