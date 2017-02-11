(function() {
  angular
    .module('psychLocator')
    .controller('adminCtrl', adminCtrl);

  adminCtrl.$inject = ['$location', 'auth'];

  function adminCtrl($location, auth) {
    var vm = this;
    console.log('admin is running');
  }
})();
