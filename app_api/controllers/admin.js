var mongoose = require('mongoose');
var User = require('../models/users');
var Unit = require('../models/units');
var request = require('request');
var config = require('../config/config');

module.exports.unitsRead = function(req, res) {
	if (!req.payload._id) {
		res.status(401).json({
			'message': 'Unauthorized error'
		});
	} else {
		Unit.find({}, function(err, units) {
			if (err) {
				return res.status(400).json({
					'message': 'No units found'
				})
			}

			res.status(200).json(units);
		});
	}
};

module.exports.newUnit = function(req, res) {
	if (!req.payload._id) {
		console.log('error');
		res.status(401).json({
			'message': 'Unauthorized error'
		});
	} else {
		if (req.body.name && req.body.address) {
			var unit = new Unit;
			unit.name = req.body.name;
			unit.address = req.body.address;
			unit.insurance = req.body.insurance;
			unit.tel = req.body.tel;
			unit.info = req.body.info;
			unit.lat = req.body.lat;
			unit.lng = req.body.lng;
			unit.save(function(err, unit) {
				if (err) { res.status(401).json({
						'message': 'Not saved'
					});
				}
				res.json(unit);
			});
		} else {
			res.status(401).json({
				'message': 'Name and Address required'
			});
		}
	}
};

module.exports.editUnit = function(req, res) {
	// edit unit
	if (!req.payload._id) {
		res.status(401).json({
			'message': 'Unauthorized error'
		});
	} else {
		Unit.findById({ _id: req.body._id }, function(err, unit) {
			if (err) {
				return res.status(400).json({
					'message': 'Unit not found'
				});
			} else {
				unit.name = req.body.name;
				unit.address = req.body.address;
				unit.insurance = req.body.insurance;
				unit.tel = req.body.tel;
				unit.info = req.body.info;
				unit.lat = req.body.lat;
				unit.lng = req.body.lng;
				unit.save(function(err, updated) {
					if (err) { return res.status(400).json({
						'message': 'Unable to save update'
					}); }
					return res.status(200).json({ 'message': 'Updated'});
				});
			}
		});
	}
};

module.exports.deleteUnit = function(req, res) {
	// delete unit
	if (!req.payload._id) {
		res.status(401).json({
			'message': 'Unauthorized error'
		});
	} else {
		Unit.remove({ _id: req.body._id }, function(err) {
			if (err) {
				return res.status(400).json({
					'message': 'Unit not deleted'
				})
			}
			return res.status(200).json({'message':'Unit deleted'});
		});
	}
};