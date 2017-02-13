(function() {
  angular
    .module('psychLocator')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$http', 'calculate'];
    function homeCtrl($http, calculate) {
      console.log('Home controller is running');

      var vm = this;
      vm.zipcode = function() {
        console.log('Zipcode');
      };

      $http.get('/api/units').then(function(result) {
        vm.locations = result.data;
      }, function(err) {
        vm.alertMsg = 'Error :' + err;
      });

      vm.gpsErr = function() {
        vm.alertMsg = 'GPS Error: cannot find coordinates';
      };
      vm.gps = function() {
        console.log('GPS');
        if (navigator.geolocation) {
          var timed = setTimeout(function() { vm.gpsErr(); }, 9000);
          // ask for gps coordinates
          navigator.geolocation.getCurrentPosition(function(position) {
            var lng = position.coords.longitude;
            var lat = position.coords.latitude;
            console.log(lat, lng);
            vm.locations.forEach(function(data) {
              data.distance = Math.floor(calculate.distance(lat, lng, data.lat, data.lng));
            });
            console.log(vm.locations);
            // $scope.$apply(function() {
            //   self.gpsChecked = true;
            //   self.gpsError = false;
            // });
            clearTimeout(timed);
            return true;
          });
        } else {
          vm.gpsErr();
        }
      };
    }
})();
