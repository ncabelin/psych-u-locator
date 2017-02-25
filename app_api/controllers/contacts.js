var mongoose = require('mongoose');
var Contact = require('../models/contacts');

module.exports.contactsRead = function(req, res) {
	Contact.find({}, function(err, contact) {
		if (err) { res.status(400).json({ 'message': 'No contacts found'})}

		res.status(200).json(contact);
	});
};