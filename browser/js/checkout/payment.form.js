app.config(function($stateProvider) {

  $stateProvider.state('checkout', {
    url: '/checkout',
    templateUrl: 'js/checkout/payment.form.html',
    controller: 'PaymentCtrl'
  });
});

app.controller('PaymentCtrl', function($scope, PaymentFactory, $state, $log) {
  $scope.sendPayment = function() {
    PaymentFactory.addAddress($scope.shipping, $scope.billing)
    .then(function() {
      console.log('I\'m here!')
      $state.go('reviewOrder');
    })
    .catch($log.error);
  }

  $scope.sameAdd = false;

  $scope.checkboxChange = function() {
    // console.log($scope.payment);
    $scope.checked = true;
    $scope.a = $scope.shipping.streetAddress;
    $scope.a2 = $scope.shipping.streetAddress2;
    $scope.city = $scope.shipping.city;
    $scope.state = $scope.shipping.state;
    $scope.zip = $scope.shipping.zip;
  };

  PaymentFactory.getCurrOrder()
  .then(function(order) {
    $scope.currOrder = order;
  })
  .catch($log.error);

  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia', 'American Samoa', 'Federated States of Micronesia', 'Guam', 'Marshall Islands', 'Northern Mariana Islands', 'Palau', 'Puerto Rico', 'Virgin Islands', 'Armed Forced Americas', 'Armed Forces Africa', 'Armed Forces Canada', 'Armed Forces Europe', 'Armed Forces Middle East', 'Armed Forces Pacific']

});

app.factory('PaymentFactory', function($http, $state, $log) {
  var obj = {};

  obj.addAddress = function(shipping, billing) {
    return $http.post('/api/addresses', shipping)
    .then(function() {
      return $http.post('/api/addresses', billing)
    })
    .then(function (res) {
      return res;
    });
  };

  obj.getCurrOrder = function() {
    return $http.get('/api/orders/checkout')
    .then(function(res) {
      return res.data;
    });
  }

  return obj;
});
