var mongoose = require('mongoose');

var unitSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
	address: { type: String, required: true },
	tel: String,
	insurance: String,
	info: String,
	lat: Number,
	lng: Number
});

module.exports = mongoose.model('Unit', unitSchema);