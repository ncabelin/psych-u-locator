var request = require('request');
var config = require('../config/config');

module.exports.address = function(req, res) {
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
	var key = config().google_key;
	var zip = req.params.address;
  var urlComplete = url + zip + key;
  request(urlComplete, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log(data);
      if (data.results[0]) {
       var loc = data.results[0].geometry.location;
       res.json(loc);
       return;
      }
    } else {
      console.log(error);
    }
  });
};