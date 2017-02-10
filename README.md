# Psych Unit Locator

## Dependencies

1. express
2. morgan
3. mongoose
4. jsonwebtoken
5. crypto
6. body-parser
7. passport
8. passport-local

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
		auth.js - 
		profile.js
	/models
		db.js - contains url for connecting (.gitignore)
		users.js - User mongoose model
		config.js - contains secret phrase for token generating (.gitignore)
	/routes
		index.js -
	/config
		passport.js - Passport configuration
/app_client
	index.html
	core.js
	/js
	/css
	/images


```