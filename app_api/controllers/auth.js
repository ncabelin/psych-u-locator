var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/users');

var sendJSONresponse = function(res, status, content) {
	res.status(status).json(content);
}

module.exports.register = function(req, res) {
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			'message': 'All fields required'
		});
	}

	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);

	user.save(function(err) {
		var token;
		token = user.generateJwt();
		res.status(200).json({ 'token': token});
	});
};

module.exports.login = function(req, res) {
	if (!req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			'message': 'All fields required'
		});
	}

	passport.authenticate('local', function(err, user, info) {
		var token;

		if (err) {
			res.status(404).json(err);
			return;
		}

		if (user) {
			token = user.generateJwt();
			res.status(200);
			res.json({
				'token': token
			});
		}
	})(req, res);
};