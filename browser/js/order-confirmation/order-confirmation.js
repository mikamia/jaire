app.config(function ($stateProvider) {
  $stateProvider.state('confirmationPage', {
    url: '/confirmation',
    templateUrl: 'js/order-confirmation/order-confirmation.html',
    controller: 'OrderConfirmationCtrl',
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

app.controller('OrderConfirmationCtrl', function ($scope, $state, shipping, billing) {
  $scope.continueShopping = function () {
    $state.go('products');
  }

  $scope.confirmNumber = Math.floor(Math.random() * (111500 - 11500) + 11500);
  $scope.shipping = shipping;
  $scope.billing = billing;
});

