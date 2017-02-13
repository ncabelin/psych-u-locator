(function() {
  angular.module('psychLocator')
    .service('geolocator', geolocator);

  geolocator.$inject = ['$q', '$window'];

  function geolocator($q, $window) {
    function locate() {
      var deferred = $q.defer();

      if (!$window.navigator.geolocation) {
        deferred.reject('Geolocation not supported');
      } else {
        $window.navigator.geolocation.getCurrentPosition(function(position) {
          deferred.resolve(position);
        },
          function(err) {
            deferred.reject(err);
        });
      }

      return deferred.promise;
    }

    return {
      locate: locate
    };
  }

})();
