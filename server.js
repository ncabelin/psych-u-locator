// Psych Unit Locator RESTful API with Token based auth

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var ip = process.env.IP;
var connection = require('./app_api/models/db');
mongoose.connect(connection.url);
var routesApi = require('./app_api/routes/routes')
var passport = require('passport');

var config = require('./app_api/config/passport');

function requireHTTPS(req, res, next) {
	// Force https
  // The 'x-forwarded-proto' check is for Heroku
  if (req.get('host') == 'localhost:8080') {
  	return next();
  }
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/app_client'));
app.use(passport.initialize());
app.use(routesApi);
app.use(function(err, req,res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ 'message': err.name + ':' 
			+ err.name + ' ' + err.message});
	}
});

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/app_client/index.html');
});

app.listen(port, ip, function() {
	console.log('Server started at port :' + port);
});