var mongoose = require('mongoose');
var Unit = require('../models/units');

module.exports.unitsRead = function(req, res) {
	// get all units
	Unit.find({}, function(err, units) {
		if (err) { 
			return res.status(400).json({ 'message': 'No units found'}); 
		}
		res.status(200).json(units);
	});
};