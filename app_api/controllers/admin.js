var mongoose = require('mongoose');
var User = require('../models/users');
var Unit = require('../models/units');
var Contact = require('../models/contacts');
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

module.exports.contactsRead = function(req, res) {
	Contact.find({}, function(err, contacts) {
		if (err) { res.status(400).json('message': 'No contacts found')}
		res.status(200).json(contacts);
	});
};

module.exports.newContact = function(req, res) {
	if (!req.payload._id) {
		res.status(401).json({
			'message': 'Unauthorized error'
		});
	} else {
		if (req.body.name && req.body.tel) {
			var contact = new Contact;
			contact.name = req.body.name;
			contact.tel = req.body.tel;
			contact.info = req.body.info;
			contact.save(function(err, contact) {
				if (err) { res.status(400).json('message': 'Error saving')}
				res.status(200).json(contact);
			});
		}
	} else {
		res.status(400).json('message': 'Name and Telephone required');
	}
};

module.exports.editContact = function(req, res) {
	if (!req.payload._id) {
		res.status(401).json({
			'message': 'Unauthorized error'
		});
	} else {
		if (req.body.name && req.body.tel && req.body._id) {
			Contact.findById({ _id: req.body._id}, function(err, contact) {
				if (err) { res.status(400).json({ 'message': 'Contact not found'})}
				contact.name = req.body.name;
				contact.tel = req.body.tel;
				contact.info = req.body.info;
				contact.save(function(err, contact) {
					if (err) { res.status(400).json('message': 'Error saving')}
					res.status(200).json('message': 'Saved contact');
				})
			});
		} else {
			res.status(400).json('message': 'Cannot leave Name and Telephone blank');
		}
	}
};

module.exports.deleteContact = function(req, res) {
	if (!req.payload._id) {
		res.status(401).json({
			'message': 'Unauthorized error'
		});
	} else {
		if (req.body._id) {
			Contact.remove({ _id: req.body._id}, function(err) {
				if (err) { res.status(400).json('message': 'Error deleting')}
				res.status(200).json('message': 'Deleted contact');
			})
		}
	}
};

