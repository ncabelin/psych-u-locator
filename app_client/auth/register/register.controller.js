(function() {
  angular
    .module('psychLocator')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'auth'];
  function registerCtrl($location, auth) {
    var vm = this;
    vm.alertMsg = false;
    vm.credentials = {
      name: '',
      email: '',
      password: '',
      code: ''
    };

    vm.onSubmit = function() {
      console.log('Submitting registration');
      if (vm.credentials.name && vm.credentials.email && vm.credentials.password) {
        vm.alertMsg = false;
        auth
          .register(vm.credentials)
          .then(function(result) {
    				auth.saveToken(result.data.token);
    				console.log('sent registry data');
            $location.path('admin');
    			}, function(err) {
    				vm.alertMsg = 'Invalid Code';
    			});
      } else {
        vm.alertMsg = 'Please fill up all fields';
      }
    };
  }
})();
