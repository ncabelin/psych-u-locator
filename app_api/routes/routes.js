var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var secret = require('../config/config')
var auth = jwt({
	secret: secret().secret_token,
	userProperty: 'payload'
});

var ctrlAdmin = require('../controllers/admin');
var ctrlAuth = require('../controllers/auth');
var ctrlUnits = require('../controllers/units');
var ctrlContacts = require('../controllers/contacts');
var ctrlCoordinates = require('../controllers/coordinates');

router.get('/api/admin', auth, ctrlAdmin.unitsRead);
router.get('/api/units', ctrlUnits.unitsRead);
router.get('/api/contacts', ctrlContacts.contactsRead);
router.get('/api/coordinates/:address', ctrlCoordinates.address);
router.get('/login', function(req, res) {
	res.redirect('/');
});
router.get('/admin', function(req, res) {
	res.redirect('/');
});
router.get('/register', function(req, res) {
	res.redirect('/');
});
router.post('/api/new/unit', auth, ctrlAdmin.newUnit);
router.post('/api/edit/unit', auth, ctrlAdmin.editUnit);
router.post('/api/delete/unit', auth, ctrlAdmin.deleteUnit);
router.post('/api/new/contact', auth, ctrlAdmin.newContact);
router.post('/api/edit/contact', auth, ctrlAdmin.editContact);
router.post('/api/delete/contact', auth, ctrlAdmin.deleteContact);
router.post('/api/register', ctrlAuth.register);
router.post('/api/login', ctrlAuth.login);

module.exports = router;