app.config(function ($stateProvider) {
  $stateProvider.state('reviewOrder', {
    url: '/review-order',
    templateUrl: 'js/review-order/review-order-form.html',
    controller: 'ReviewOrderCtrl'
  });
});

app.controller('ReviewOrderCtrl', function ($scope, $state, AddressFactory) {
  $scope.confirm = function () {
    $state.go('confirmationPage')
  }

  AddressFactory.getAddress()
  .then(function (address) {
    $scope.address = address;
  });
});

app.factory('AddressFactory', function($http){
  var obj = {};

  obj.getAddress = function () {
    return $http.get('/api/addresses/unauth')
    .then(function (res) {
      return res.data;
    });
  };

  return obj;
})
