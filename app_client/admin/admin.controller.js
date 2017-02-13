(function() {
  angular
    .module('psychLocator')
    .controller('adminCtrl', adminCtrl);

  adminCtrl.$inject = ['$location', 'meanData'];
  function adminCtrl($location, meanData) {
    var vm = this;
    vm.adding = false;
    vm.user = {};
    vm.locations = [];
    meanData.getAdmin()
    	.then(function(result) {
    		// result.data
    		vm.locations = result.data;
    	}, function(err) {
    		// do error handling
        vm.alertMsg = 'Error :' + err;
        console.log(err);
    	});

    vm.addUnit = function(obj) {
      vm.alertMsg = false;
      meanData.newUnit(obj)
        .then(function(result) {
          vm.locations.push(result.data);
          vm.added = {};
        }, function(err) {
          vm.alertMsg = 'Error adding';
        });
    };

    vm.editUnit = function(obj) {
      vm.alertMsg = false;
      meanData.editUnit(obj)
        .then(function(result) {
          console.log(result);
        }, function(err) {
          vm.alertMsg = 'Error updating:' + err;
          console.log('error :', err);
        });
    };

    vm.deleteUnit = function(obj) {
      vm.alertMsg = false;
      meanData.deleteUnit(obj)
        .then(function(result) {
          var index = vm.locations.indexOf(obj);
          vm.locations.splice(index, 1);
        }, function(err) {
          vm.alertMsg = 'Error deleting:' + err;
          console.log('error :', err);
        });
    };
  }
})();
