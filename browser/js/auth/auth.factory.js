app.factory('Auth', function ($http, $rootScope, User) {
  var me = new User();
  $rootScope.isLoggedIn = function () {
    return !!me.id;
  };
  $rootScope.isAdmin = function () {
    return !!me.isAdmin;
  };
  $rootScope.isMe = function (user) {
    return !!user && (me.id == user.id || me == user);
  };
  function toData (response) {
    return response.data;
  }
  function setMe (user) {
    me = new User(user);
    return me;
  }
  function removeMe () {
    me = new User();
    return me;
  } 
  return {
    signup: function (credentials) {
      return $http.post('/api/signup', credentials)
      .then(toData)
      .then(setMe);
    },
    login: function (credentials) {
      return $http.post('/api/login', credentials)
      .then(toData)
      .then(setMe);
    },
    logout: function () {
      return $http.delete('/api/me')
      .then(removeMe);
    },
    refreshMe: function () {
      return $http.get('/api/me')
      .then(toData)
      .then(setMe);
    }
  };
});
