var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
	name: String,
	tel: String,
	info: String
});

module.exports = mongoose.model('Contact', contactSchema);