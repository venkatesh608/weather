var http = require('http');
var assert = require('assert');

var server = require('./app.js');

describe('HTTP Server Test', function() {
  
  describe('/weather/42.3601,-71.0589', function() {
    it('should be America/New_York', function(done) {
      http.get('http://127.0.0.1:3000', function(response) {
        // Assert the status code.
        assert.equal(response.statusCode, 200);
        //assert something from the respone - TODO
        

      });
    });
  });
});