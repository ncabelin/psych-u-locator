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

  .run(['$rootScope', '$location', 'auth', function($rootScope, $location, auth) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/admin' && !auth.isLoggedIn()) {
        $location.path('/');
      }
    });
  }]);
})();
