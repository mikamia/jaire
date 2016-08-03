app.directive('orderTable', function(CartFactory, OrderTableFactory, $log) {
  return {
    restrict: 'E',
    scope: {
      orderId: '='
    },
    templateUrl: 'js/orders/order-table.template.html',
    link: function(scope, element, attr) {
      if (!scope.orderId) {
        CartFactory.getCurrOrderProds()
        .then(products => {
          scope.orderProducts = products;
        })
        .catch($log.error);
      } else {
        OrderTableFactory.getOrderProducts(scope.orderId)
        .then(products => {
          scope.orderProducts = products;
        })
        .catch($log.error);
      }
    }
  }
});

app.factory('OrderTableFactory', function($http) {
  let f = {};
  f.getOrderProducts = function(id) {
    console.log('the id that i\'m sengind to the routes', id);
    return $http.get('/api/orders/order-products/' + id)
    .then(res => res.data);
  };
  return f;
});
