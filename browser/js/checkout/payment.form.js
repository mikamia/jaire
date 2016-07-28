app.config(function($stateProvider) {

  $stateProvider.state('checkout', {
    url: '/checkout',
    templateUrl: 'js/checkout/payment.form.html',
    controlelr: 'CheckoutCtrl'
  });
});

app.controller('CheckoutCtrl', function($scope) {
  console.log('hello');
  $scope.showBillingAddress = function() {
    console.log($scope.payment.billingAddress);
    if ($scope.payment.billingAddress) return true;
    else return false;
  }
});
