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
      password: ''
    };

    vm.onSubmit = function() {
      console.log('Submitting registration');
      if (vm.credentials.name && vm.credentials.email && vm.credentials.password) {
        vm.alertMsg = false;
        auth
          .register(vm.credentials)
          .error(function(err) {
            alert(err);
          })
          .then(function() {
            $location.path('admin');
          });
      } else {
        vm.alertMsg = 'Please fill up all fields';
      }
    };
  }
})();