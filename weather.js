var request = require('request');
logger = require('./logger');
var SECRET_KEY = 'bfe5bce5ea1ea58c3c8f126866983cea';  

exports.getWeatherForLocation = function(req, res) {
  logger.debug('calling getWeatherForLocation......');
  var coordinates = req.params.coordinates;
  //darksky api url to hit
  var url = 'https://api.darksky.net/forecast/' + SECRET_KEY + '/' + coordinates;
  //invoking darksky api - very small logic to handle hence doing it here itself
  request.get(
      url,
      function (error, response, body) { 
      // post invoke processing with response body
      if (!error && response.statusCode == 200) {      
        logger.debug('successfully processed weather request for: '+ coordinates);        
      }else{
        // if error occurred
        logger.debug('error occurred: '+ response.body);
      }
      res.set('Content-Type', 'application/json');
      res.status(response.statusCode).send(response.body); 
  }); 
}

exports.getPastWeekWeatherForLocation = function(req, res) {
  logger.debug('calling getWeatherForLocation......');
  var coordinates = req.params.coordinates;
  //darksky api url to hit
  var url = 'https://api.darksky.net/forecast/' + SECRET_KEY + '/' + coordinates;
  //invoking darksky api - very small logic to handle hence doing it here itself
  request.get(
      url,
      function (error, response, body) { 
      // post invoke processing with response body
      if (!error && response.statusCode == 200) {      
        logger.debug('successfully processed weather request for: '+ coordinates);        
      }else{
        // if error occurred
        logger.debug('error occurred: '+ response.body);
      }
      res.set('Content-Type', 'application/json');
      res.status(response.statusCode).send(response.body); 
  }); 
}
