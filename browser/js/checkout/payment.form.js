app.config(function($stateProvider) {

  $stateProvider.state('checkout', {
    url: '/checkout',
    templateUrl: 'js/checkout/payment.form.html',
    controller: 'PaymentCtrl'
  });
});

app.controller('PaymentCtrl', function($scope, PaymentFactory) {
  $scope.sendPayment = function() {
    $scope.paymentForm.$setPristine();
    PaymentFactory.addPayment($scope.payment);
    $scope.payment = {};
  }

  $scope.sameAdd = false;

  $scope.checkboxChange = function() {
    if ($scope.sameAdd) {
      $scope.sameAdd = false;
    } else {
      $scope.sameAdd = true;
    }
  };

  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia', 'American Samoa', 'Federated States of Micronesia', 'Guam', 'Marshall Islands', 'Northern Mariana Islands', 'Palau', 'Puerto Rico', 'Virgin Islands', 'Armed Forced Americas', 'Armed Forces Africa', 'Armed Forces Canada', 'Armed Forces Europe', 'Armed Forces Middle East', 'Armed Forces Pacific']

});

app.factory('PaymentFactory', function($http, $state, $log) {
  var obj = {};

  obj.addPayment = function(data) {
    return $http.post('/api/addresses', data)
      .catch($log.error);
  };

  return obj;
});
