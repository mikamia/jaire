app.config(function($stateProvider) {

  $stateProvider.state('checkout', {
    url: '/checkout',
    templateUrl: 'js/checkout/payment.form.html',
    controller: 'PaymentCtrl'
  });
});

app.controller('PaymentCtrl', function($scope, PaymentFactory) {
  $scope.sendPayment = function(info) {
    return PaymentFactory.addPayment($scope.payment);
  }
});

app.factory('PaymentFactory', function($http, $state) {
  var obj = {};

  obj.addPayment = function(data) {
    return $http.post('/api/addresses', data);
  };


  return obj;
});
