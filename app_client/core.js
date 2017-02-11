(function() {
  angular.module('psychLocator', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })

      .when('/register', {
        templateUrl: 'auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })

      .when('/login', {
        templateUrl: 'auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })

      .when('/admin', {
        templateUrl: 'admin/admin.view.html',
        controller: 'adminCtrl',
        controllerAs: 'vm'
      })

      .otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode(true);
  })

  // .config(['$locationProvider', function($locationProvider) {
  // 	  $locationProvider.hashPrefix('');
  // 	}])

  .run(['$rootScope', '$location', 'auth', function($rootScope, $location, auth) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/admin' && !auth.isLoggedIn()) {
        $location.path('/');
      }
    });
  }]);
})();

// angular.module('psychLocator', ['ngRoute'])

//   .config(function($routeProvider) {
//     $routeProvider

//       // contains search by zipcode and gps, contacts
//       .when('/', {
//         templateUrl: './pages/main.html',
//       })

//       .when('/register', {
//         templateUrl: './pages/register.html',
//         controller: 'registerController',
//         controllerAs: 'register'
//       })

//       .when('/login', {
//         templateUrl: './pages/login.html',
//         controller: 'loginController',
//         controllerAs: 'login'
//       })

//       .when('/admin', {
//         templateUrl: './pages/admin.html'
//       })

//       .when('/help', {
//         templateUrl: './pages/help.html'
//       })

//       .otherwise({ redirectTo: '/'});
//   })

//   // fix for the routing issue
// 	.config(['$locationProvider', function($locationProvider) {
// 	  $locationProvider.hashPrefix('');
// 	}])

//   .controller('mainController', function() {
//     var self = this;
//   })

//   .controller('registerController', function($http) {
//     this.name = 'Register';
//     this.register = function(reg) {
//       if (reg.name && reg.password && reg.email) {
//         console.log('Send');
//         $http.post('/api/register', reg).then(function(result) {
//           self.alertMsg = result.data.message;
//         }, function(err) {
//           console.log(err);
//           self.alertMsg = err.data;
//         });
//       } else {
//         self.alertMsg = 'Please fill up all fields';
//       }
//     };
//   })

//   .controller('loginController', function($http) {
//     this.log = function(loginData) {
//       console.log('log');
//       console.log(loginData);
//       if (loginData.email && loginData.password) {
//         $http.post('/api/login', loginData).then(function(result) {
//           console.log(result.data);
//         }, function(err) {
//           console.log(err);
//         });
//       } else {
//         console.log('Please fill up all fields')
//       }
//     };
//   })

//   .controller('adminController', function() {

//   });
