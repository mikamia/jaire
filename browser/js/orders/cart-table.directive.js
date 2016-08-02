<<<<<<< HEAD
app.directive('cartTable', function(CartFactory, OrderFactory, $log) {
=======
app.directive('orderTable', function(CartFactory, OrderTableFactory, $log) {
>>>>>>> master
  return {
    restrict: 'E',
    scope: {
      orderId: '='
    },
    templateUrl: 'js/orders/cart-table.template.html',
    link: function(scope, element, attr) {
<<<<<<< HEAD
      scope.updateOrderProduct = function (orderId, productId, productQty, $index){ 
        OrderFactory.updateQty(orderId, productId, productQty)
        .then(function(product){
          scope.orderProducts[$index]=product;
        })
      };
      if (!scope.order) {
=======
      if (!scope.orderId) {
>>>>>>> master
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
