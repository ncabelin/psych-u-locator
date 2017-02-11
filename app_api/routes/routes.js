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

router.get('/admin', auth, ctrlAdmin.adminRead);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;