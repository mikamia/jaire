app.config(function ($stateProvider) {
  $stateProvider.state('confirmationPage', {
    url: '/confirmation',
    templateUrl: 'js/order-confirmation/order-confirmation.html',
    controller: 'OrderConfirmationCtrl',
    resolve: {
      shipping: function(OrderConfirmationFactory) {
        return OrderConfirmationFactory.getShippingAdd();
      },
      billing: function(OrderConfirmationFactory) {
        return OrderConfirmationFactory.getBillingAdd();        
      },
      orderId: function(OrderConfirmationFactory) {
        return OrderConfirmationFactory.getConfirmedOrderId();
      }
    }
  });
});

app.controller('OrderConfirmationCtrl', function ($scope, $state, shipping, billing, orderId) {
  $scope.continueShopping = function () {
    $state.go('products');
  }

  $scope.confirmNumber = Math.floor(Math.random() * (111500 - 11500) + 11500);
  $scope.shipping = shipping;
  $scope.billing = billing;
  $scope.orderId = orderId;
  console.log($scope.orderId);
});

app.factory('OrderConfirmationFactory', function($http) {
  var f = {};
  f.getShippingAdd = function() {
    return $http.get('/api/addresses/checkout/confirmed/shipping')
    .then(function(res) {
      return res.data;
    });
  };
  f.getBillingAdd = function() {
    return $http.get('/api/addresses/checkout/confirmed/billing')
    .then(function(res) {
      return res.data;
    });
  };
  f.getConfirmedOrderId = function() {
    return $http.get('/api/orders/confirmed-order-id')
    .then(function(res) {
      return res.data;
    });
  };
  return f;
})

