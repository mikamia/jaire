app.controller('CartController', function($scope, CartFactory, OrderFactory, $log, $state) {
  $scope.checkout = function() {
    CartFactory.checkout()
    .then(function() {
      $state.go('checkout');
    })
    .catch($log.error); 
  }
});

app.factory('CartFactory', function($http) {
  let cartF = {};
  cartF.getCurrOrderProds = function () {
    return $http.get('/api/orders/cart')
    .then(function(res) {
      return res.data;
    });
  }
  cartF.getCurrOrder = function (){
    return $http.get('')
  }
  cartF.checkout = function () {
    return $http.put('api/orders/checkout')
    .then(function (res) {
      return res;
    });
  }
  return cartF;
});

app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    controller: 'CartController'
  });
});
