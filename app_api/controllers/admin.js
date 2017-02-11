var mongoose = require('mongoose');
var User = require('../models/users');

module.exports.adminRead = function(req, res) {
	if (!req.payload._id) {
		res.status(401).json({
			'message': 'Unauthorized error'
		});
	} else {
		User.findById(req.payload._id).exec(function(err, user) {
			res.status(200).json(user);
		});
	}
};