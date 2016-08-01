app.config(function($stateProvider) {

  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/signup/signup.html',
    controller: 'SignupCtrl'
  });
});

app.controller('SignupCtrl', function($scope, AuthFactory, OrderFactory, $state, AuthService) {
  $scope.sendSignup = function(info) {
    AuthFactory.signup($scope.signup)
    .then(function() {
      return AuthService.login(info)
    })
    .then(function() {
      // when someone signs up, their cart should be assigned their new userid
      return OrderFactory.continueCart();
    })
    .then(function() {
      $state.go('home');
    });
  }


});


app.factory('AuthFactory', function($http, $state) {
  var authObj = {};

  // var superUser = false; //isAdmin determines superUser
  authObj.currentUser = {};
  authObj.currentUser.loggedIn = false;

  authObj.signup = function(data) {
    return $http.post('/api/users', data)
      // .catch($log.error);
  };

  authObj.isLoggedIn = function() {
    return authObj.currentUser.loggedIn;
  };

  return authObj;
});
