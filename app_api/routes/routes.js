var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var secret = require('../config/config')
var auth = jwt({
	secret: secret().secret_token,
	userProperty: 'payload'
});

var ctrlAdmin = require('../controllers/admin');
var ctrlAuth = require('../controllers/auth')
var ctrlUnits = require('../controllers/units')

router.get('/admin', auth, ctrlAdmin.unitsRead);
router.get('/units', ctrlUnits.unitsRead);
router.post('/new/unit', auth, ctrlAdmin.newUnit);
router.post('/edit/unit', auth, ctrlAdmin.editUnit);
router.post('/delete/unit', auth, ctrlAdmin.deleteUnit);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;