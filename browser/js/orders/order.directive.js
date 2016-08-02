app.directive('orderTable', function(CartFactory, OrderFactory, $log) {
  return {
    restrict: 'E',
    scope: {
      order: '='
    },
    templateUrl: 'js/orders/order-table.template.html',
    link: function(scope, element, attr) {
      scope.updateOrderProduct = OrderFactory.updateQty;
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
