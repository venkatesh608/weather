const express = require('express');
const app3005 = express(); 
const app3006 = express(); 
const weatherLib = require('./weather.js');
var http = require('http');

app3005.get('/', function(req, res) {
  res.send('Navigate to /weather/:latitude,longitude to get weather for particular location')
});

app3005.get('/weather/:coordinates', function(req, res) {
  weatherLib.getWeatherForLocation(req,res);
});
app3005.listen(3005, function() {
  logger.info('Started app on port 3005')
});

app3006.get('/weather/pastweek/:coordinates', function(req, res) {
  weatherLib.getPastWeekWeatherForLocation(req,res);
});
app3006.listen(3006, function() {
  logger.info('Started app on port 3006')
});


