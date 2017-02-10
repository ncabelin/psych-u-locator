var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var secret = require('../config/config')
var auth = jwt({
	secret: secret().secret_token,
	userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/auth')

router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;