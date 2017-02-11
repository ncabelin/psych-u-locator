(function() {
  angular
    .module('psychLocator')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'auth'];
  function meanData($http, auth) {
    var getAdmin = function() {
      return $http.get('/api/admin', {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      });
    };

    return {
      getProfile: getProfile
    };
  }
})();
