app.controller('CartController', function($scope, CartFactory, $log) {
  CartFactory.getCurrOrderProds()
  .then(products => {
    $scope.order = products;
  })
  .catch($log.error);

});

app.factory('CartFactory', function($http) {
  let cartF = {};
  cartF.getCurrOrderProds = function () {
    return $http.get('/api/cart')
    .then(function(res) {
      return res.data;
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

//go through and display every thing in the current cart (session id?)
//