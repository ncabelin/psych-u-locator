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
    		console.log(result.data);
    		vm.locations = result.data;
    	}, function(err) {
    		// do error handling
        console.log(err);
    	});

    vm.addUnit = function(obj) {
      meanData.newUnit(obj)
        .then(function(result) {
          vm.locations.push(result.data);
          vm.added = {};
        }, function(err) {
          console.log('error adding');
        });
    };

    vm.editUnit = function(obj) {
      meanData.editUnit(obj)
        .then(function(result) {
          console.log(result);
        }, function(err) {
          console.log('error :', err);
        });
    };

    vm.deleteUnit = function(obj) {
      console.log(obj);
      meanData.deleteUnit(obj)
        .then(function(result) {
          console.log(result.data);
          var index = vm.locations.indexOf(obj);
          console.log(index);
          vm.locations.splice(index, 1);
          console.log(vm.locations);
        }, function(err) {
          console.log('error :', err);
        });
    };
  }
})();
