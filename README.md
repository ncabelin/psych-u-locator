# Psych Unit Locator

An application that checks for the nearest psych unit in Los Angeles and show you pertinent info. This app is used by the San Fernando Valley Community Mental Health Center. It can access the current location and show the 

## Dependencies

1. express
2. morgan
3. mongoose
4. jsonwebtoken
5. crypto
6. body-parser
7. passport
8. passport-local
9. express-jwt

## Route Structure
1. Main page - public
2. Register - public
3. Login - public
4. Profile - private
5. Help - public

## Folder Structure
```
server.js - initialize
/app_api
	/controllers
		auth.js - handle Auth
		admin.js - handle Token
	/models
		db.js - contains url for connecting (.gitignore)
		users.js - User mongoose model
		units.js - Unit mongoose model
	/routes
		routes.js - routes
	/config
		config.js - Secret keywords
		passport.js - Passport configuration

/app_client
	index.html
	core.js
	/js
	/css
	/images


```