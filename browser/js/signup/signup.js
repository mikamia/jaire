app.config(function($stateProvider) {

  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/signup/signup.html',
    controller: 'SignupCtrl'
  });
});

app.controller('SignupCtrl', function($scope, AuthFactory, $state) {

  $scope.sendSignup = function() {
    return AuthFactory.signup($scope.signup);
  }

});


app.factory('AuthFactory', function($http, $state) {
  var authObj = {};

  // var superUser = false; //isAdmin determines superUser
  authObj.currentUser = {};
  authObj.currentUser.loggedIn = false;

  authObj.signup = function(data) {
    return $http.post('/api/users', data)
      .then(function() {
        $state.go('home');
      });
    // .catch($log.error);
  };

  authObj.isLoggedIn = function() {
    return authObj.currentUser.loggedIn;
  };

  return authObj;
});
