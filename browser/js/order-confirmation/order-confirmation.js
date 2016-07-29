app.config(function ($stateProvider) {
  $stateProvider.state('confirmationPage', {
    url: '/confirmation',
    templateUrl: 'js/order-confirmation/order-confirmation.html',
    controller: 'OrderConfirmationCtrl'
  });
});

app.controller('OrderConfirmationCtrl', function ($scope, $state) {
  $scope.continueShopping = function () {
    $state.go('products');
  }
});
