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

router.get('/admin', auth, ctrlAdmin.unitsRead);
router.get('/units', ctrlUnits.unitsRead);
router.get('/contacts', ctrlContacts.contactsRead);
router.get('/coordinates/:address', ctrlCoordinates.address);
router.post('/new/unit', auth, ctrlAdmin.newUnit);
router.post('/edit/unit', auth, ctrlAdmin.editUnit);
router.post('/delete/unit', auth, ctrlAdmin.deleteUnit);
router.post('/new/contact', auth, ctrlAdmin.newContact);
router.post('/edit/contact', auth, ctrlAdmin.editContact);
router.post('/delete/contact', auth, ctrlAdmin.deleteContact);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;