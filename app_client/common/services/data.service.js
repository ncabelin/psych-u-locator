(function() {
  angular
    .module('psychLocator')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'auth'];
  function meanData($http, auth) {
    var authObj = {
      headers: {
        Authorization: 'Bearer ' + auth.getToken()
      }
    };
    var getAdmin = function() {
      return $http.get('/api/admin', authObj);
    };

    var newUnit = function(obj) {
      return $http.post('/api/new/unit', obj, authObj);
    };

    var editUnit = function(obj) {
      console.log(obj);
      return $http.post('/api/edit/unit', obj, authObj);
    };

    var deleteUnit = function(obj) {
      return $http.post('/api/delete/unit', obj, authObj);
    };

    var getContacts = function(obj) {
      return $http.get('/api/contacts', authObj);
    };

    var newContact = function(obj) {
      return $http.post('/api/new/contact', obj, authObj);
    };

    var editContact = function(obj) {
      console.log(obj);
      return $http.post('/api/edit/contact', obj, authObj);
    };

    var deleteContact = function(obj) {
      return $http.post('/api/delete/contact', obj, authObj);
    };


    return {
      getAdmin: getAdmin,
      newUnit: newUnit,
      editUnit: editUnit,
      deleteUnit: deleteUnit,
      getContacts: getContacts,
      newContact: newContact,
      editContact: editContact,
      deleteContact: deleteContact
    };
  }
})();
