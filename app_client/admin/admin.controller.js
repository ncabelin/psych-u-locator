(function() {
  angular
    .module('psychLocator')
    .controller('adminCtrl', adminCtrl);

  adminCtrl.$inject = ['$location', 'meanData'];
  function adminCtrl($location, meanData) {
    var vm = this;
    vm.user = {};
    meanData.getAdmin()
    	.then(function(result) {
    		// result.data
    		console.log(result.data);
    		vm.user.name = result.data.user;
    		vm.user.email = result.data.email;
    	}, function(err) {
    		// do error handling
    	})
  }
})();
