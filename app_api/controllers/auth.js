var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/users');
var code = require('../config/config');

var sendJSONresponse = function(res, status, content) {
	res.status(status).json(content);
}

module.exports.register = function(req, res) {
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			'message': 'All fields required'
		});
	}

	if (req.body.code !== code().code_num) {
		return sendJSONresponse(res, 400, {
			'message': 'Invalid Code, User is not authorized to register'
		});
	}

	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);
	user.save(function(err) {
		if (err) {
			return res.status(400).json({ 'message': 'error saving'});
		}
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