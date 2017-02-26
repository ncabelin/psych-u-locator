(function() {
  angular
    .module('psychLocator')
    .controller('adminCtrl', adminCtrl);

  adminCtrl.$inject = ['$location', 'meanData', '$http'];
  function adminCtrl($location, meanData, $http) {
    var vm = this;
    vm.adding = false;
    vm.alertMsg = '';
    vm.unitMode = true;
    vm.user = {};
    vm.added = {};
    vm.locations = [];
    vm.contacts = [];
    meanData.getAdmin()
    	.then(function(result) {
    		// result.data
    		vm.locations = result.data;
    	}, function(err) {
    		// do error handling
        vm.alertMsg += 'Error :' + err;
        console.log(err);
    	});

    meanData.getContacts()
      .then(function(result) {
        vm.contacts = result.data;
      }, function(err) {
        vm.alertMsg += 'Error :' + err;
        console.log(err)
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

    vm.findCoordinates = function() {
      $http
        .get('/api/coordinates/' + vm.added.address)
        .then(function(result) {
          vm.added.lng = result.data.lng;
          vm.added.lat = result.data.lat;
        }, function(err) {
          vm.alertMsg = 'Error getting coordinates:' + err;
          console.log('error :', err);
        });
    };

    vm.newContact = function(contact) {
      console.log(contact);
      meanData.newContact(contact)
        .then(function(result) {
          vm.contacts.push(result.data);
        })
    }

    vm.editContact = function(contact) {
      console.log(contact);
      meanData.editContact(contact)
        .then(function(result) {

        }, function(err) {

        });
    }

    vm.deleteContact = function(contact) {
      console.log(contact);
      meanData.deleteContact(contact)
        .then(function(result) {
          var index = vm.contacts.indexOf(contact);
          vm.contacts.splice(index, 1);
        })
    }
  }
})();
