var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
	// default is 'username', in this case we override by specifying 'email'
	usernameField: 'email'
},
	function(username, password, done) {
		User.findOne({ email: username }, function(err, user) {
			if (err) { return done(err); }
			// Return if user not found in database
			if (!user) {
				return done(null, false, {
					message: 'User not found'
				});
			}

			if (!user.validPassword(password)) {
				console.log('not valid password');
				return done(null, false, {
					message: 'Password is wrong'
				});
			}

			// If credentials are correct, return the user object
			return done(null, user)
		});
	}
));