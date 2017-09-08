# Psych Unit Locator

An application that checks for the nearest psych unit in Los Angeles and show you pertinent info. This app is used by the San Fernando Valley Community Mental Health Center. It can access the current location and show the distance in miles to the nearest psych units without needing to access map apps. Google maps geocoding is only used for searches based on Zipcode entry to get the user's coordinates, otherwise the user's device navigator.geolocation is used along with an algorithm to calculate the distance between 2 coordinates.

Users can register to update / edit the data but must have an authorization code (provided by a team lead or the developer), therefore the database model is many to one. For the search homepage no authentication is needed.

The application can be accessed at https://plocator.herokuapp.com

![psychunitlocator](https://res.cloudinary.com/dd6kwd0zn/image/upload/q_auto/v1504903904/Screenshot_2017-09-08_13.50.49_fbs6fc.jpg)

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
4. Admin - private
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
	core.js - main angular file
	/admin
		admin.controller.js
		admin.view.html
	/auth
		/login
			login.controller.js
			login.view.html
		/register
			register.controller.js
			register.view.html
	/common
		/directives
			/navigation
				nav.controller.js
				nav.directive.js
				nav.template.html
		/services
			auth.service.js
			calculate.service.js
			data.service.js
			geolocator.service.js
	/css
		style.css
	/help
		help.view.html
	/home
		home.controller.js
		home.view.html
	/images
```

## Contributors

Neptune Michael Cabelin

## License

MIT
