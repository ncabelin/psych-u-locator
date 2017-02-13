(function() {
  angular
    .module('psychLocator')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$http', 'calculate'];
    function homeCtrl($http, calculate) {
      console.log('Home controller is running');

      var vm = this;
      vm.showLocations = false;
      vm.sortType = '';
      vm.zipcode = function() {
        console.log('Checking Zipcode');
        vm.showZipInput = true;
      };

      vm.checkZipcode = function(zip) {
        getLocations().then(function(result) {
          vm.locations = result.data;
          $http.get('/api/coordinates/' + zip).then(function(result) {
            var lat = result.data.lat;
            var lng = result.data.lng;
            calculateDistance(vm.locations, lat, lng);
            vm.sortType = distance;
          }, function(err) {
            vm.alertMsg = 'Invalid zipcode';
          });
        }, function(err) {
          vm.alertMsg = 'Error getting locations';
        });
      };

      function getLocations() {
        return $http.get('/api/units');
      }

      function calculateDistance(arr, lat, lng) {
        arr.forEach(function(data) {
          data.distance = Math.floor(calculate.distance(lat, lng, data.lat, data.lng));
        });
      }

      getLocations();

      vm.gpsErr = function() {
        vm.alertMsg = 'GPS Error: cannot find coordinates';
      };
      vm.gps = function() {
        console.log('GPS');
        if (!vm.locations) {
          getLocations().then(function(result) {
            if (navigator.geolocation) {
              // generate error if 9 seconds has elapsed
              // some browsers / devices do not push errors to notify absence
              // of geolocator
              var timed = setTimeout(function() { vm.gpsErr(); }, 9000);
              // ask for gps coordinates
              navigator.geolocation.getCurrentPosition(function(position) {
                var lng = position.coords.longitude;
                var lat = position.coords.latitude;
                var arr = result.data;
                calculateDistance(arr, lat, lng);
                vm.locations = arr;
                clearTimeout(timed);
                return true;
              });
            } else {
              vm.gpsErr();
            }
          });
        }
      };
    }
})();
