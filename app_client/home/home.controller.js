(function() {
  angular
    .module('psychLocator')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$http', 'calculate', 'geolocator'];
    function homeCtrl($http, calculate, geolocator) {
      var vm = this;
      vm.showLocations = false;
      vm.sortType = '';
      vm.zipcode = function() {
        vm.showZipInput = true;
      };

      vm.checkZipcode = function(zip) {
        getLocations().then(function(result) {
          vm.locations = result.data;
          $http.get('/api/coordinates/' + zip).then(function(result) {
            var lat = result.data.lat;
            var lng = result.data.lng;
            calculateDistance(vm.locations, lat, lng);
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
          var dist = Math.floor(calculate.distance(lat, lng, data.lat, data.lng));
          data.distance = dist ? dist : 1;
        });
      }

      getLocations().then(function(result) {
        vm.locations = result.data;
      });
      //
      // $scope.$watch('locations', function(newVal, oldVal, scope) {
      //   vm.locations = newVal;
      // });

      vm.gpsErr = function() {
        vm.alertMsg = 'GPS Error: cannot find coordinates';
      };
      vm.gps = function() {
        var lng, lat;
        geolocator.locate().then(function(position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          calculateDistance(vm.locations, lat, lng);
        });
        // if (navigator.geolocation) {
        //   var timed = setTimeout(function() { vm.gpsErr(); }, 9000);
        //   // ask for gps coordinates
        //   navigator.geolocation.getCurrentPosition(function(position) {
        //     lng = position.coords.longitude;
        //     lat = position.coords.latitude;
        //     getLocations().then(function(result) {
        //       calculateDistance(result.data, lat, lng);
        //       clearTimeout(timed);
        //     });
        //   });
        // } else {
        //   vm.gpsErr();
        // }
      };
    }
})();
