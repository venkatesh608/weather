const express = require('express');
const app = express(); 
const weatherLib = require('./weather.js');

app.get('/', function(req, res) {
  res.send('Navigate to /weather/:latitude,longitude to get weather for particular location')
});

app.get('/weather/:coordinates', function(req, res) {
  weatherLib.getWeatherForLocation(req,res);
});

app.listen(3000, function() {
  logger.info('Started app on port 3000')
});
