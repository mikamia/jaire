app.directive('cartTable', function(CartFactory, OrderFactory, $log) {
  return {
    restrict: 'E',
    scope: {
      order: '='
    },
    templateUrl: 'js/orders/cart-table.template.html',
    link: function(scope, element, attr) {
      scope.updateOrderProduct = function (orderId, productId, productQty, $index){ 
        OrderFactory.updateQty(orderId, productId, productQty)
        .then(function(product){
          scope.orderProducts[$index]=product;
        })
      };
      if (!scope.order) {
        CartFactory.getCurrOrderProds()
        .then(products => {
          scope.orderProducts = products;
        })
        .catch($log.error);
      }
    }
  }
});
