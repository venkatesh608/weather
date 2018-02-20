var request = require('request');
logger = require('./logger');
var moment = require("moment");
var async = require("async");
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
  logger.debug('calling getPastWeekWeatherForLocation......');
  //get past week's weather info
  var lastWeekTimestamps = []
  for(i=-1;i>=-7;i--){
    lastWeekTimestamps.push(moment().add(i, 'days').unix());
  }

  var outputJson = []

  async.map(lastWeekTimestamps, function (timestamp, callback) {
    //adding timestamp to API call
    var output={};
    var coordinates = req.params.coordinates + "," + timestamp;
    //darksky api url to hit
    var url = 'https://api.darksky.net/forecast/' + SECRET_KEY + '/' + coordinates + "?exclude=currently,flags";
    //invoking darksky api - very small logic to handle hence doing it here itself
    request.get(
        url,
        function (error, response, body) { 
        // post invoke processing with response body
        if (!error && response.statusCode == 200) {      
          logger.debug('successfully processed weather request for: '+ coordinates);   
          output[moment.unix(timestamp).format("MM/DD/YYYY")]  =  JSON.parse(response.body); 
          outputJson.push(output); 
          //logger.debug('output: '+ JSON.stringify(output)); 
          //logger.debug('outputJson: '+ JSON.stringify(outputJson)); 
          callback(null, outputJson);
        }else{
          // if error occurred
          callback(new Error(response.body));
        }        
    }); 
  },
  function (err,results) {
    if (err) {
      logger.debug("error-----" + err.message);
      res.set('Content-Type', 'application/json');
      res.status(400).send(err.message); 
    }else{
      logger.debug("---outputJson---" + outputJson.length);
      res.set('Content-Type', 'application/json');
      res.status(200).send(outputJson); 
    }
  })
  
}


