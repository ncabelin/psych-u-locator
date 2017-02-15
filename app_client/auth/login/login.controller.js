(function() {
  angular
    .module('psychLocator')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'auth'];
  function loginCtrl($location, auth) {
    var vm = this;
    vm.alertMsg = false;
    vm.credentials = {
      email: '',
      password: ''
    };

    vm.onSubmit = function() {
      auth
        .login(vm.credentials)
        .then(function(result) {
  				console.log('logged');
  				auth.saveToken(result.data.token);
          $location.path('admin');
  			}, function(err) {
          vm.alertMsg = err.data.message;
        });
    };
  }
})();
