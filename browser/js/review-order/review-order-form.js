app.config(function ($stateProvider) {
  
  $stateProvider.state('reviewOrder', {
    url: '/review-order',
    templateUrl: 'js/review-order/review-order-form.html',
    controller: 'ReviewOrderCtrl',
    resolve: {
      shipping: function(ReviewOrderFactory) {
        return ReviewOrderFactory.getShippingAdd();
      },
      billing: function(ReviewOrderFactory) {
        return ReviewOrderFactory.getBillingAdd();        
      }
    }
  });
});

app.controller('ReviewOrderCtrl', function ($scope, $state, shipping, billing, ReviewOrderFactory) {
  $scope.confirm = function () {
    ReviewOrderFactory.confirm()
    .then(function() {
      $state.go('confirmationPage')
    });
  }

  $scope.makeChanges = function() {
    $state.go('')
  }  
  
  $scope.shipping = shipping;
  $scope.billing = billing;
});

app.factory('ReviewOrderFactory', function($http) {
  var f = {};
  f.getShippingAdd = function() {
    return $http.get('/api/addresses/checkout/shipping')
    .then(function(res) {
      return res.data;
    });
  };
  f.getBillingAdd = function() {
    return $http.get('/api/addresses/checkout/billing')
    .then(function(res) {
      return res.data;
    });
  };
  f.confirm = function () {
    return $http.put('api/orders/checkout')
    .then(function (res) {
      return res;
    });
  }
  return f;
})