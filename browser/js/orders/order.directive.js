app.directive('orderTable', function(CartFactory, $log) {
  return {
    restrict: 'E',
    scope: {
      order: '='
    },
    templateUrl: 'js/orders/order-table.template.html',
    link: function(scope, element, attr) {
      if (!scope.order) {
        CartFactory.getCurrOrderProds()
        .then(products => {
          scope.orderProducts = products;
        })
        .catch($log.error);
      }
      // else we will use the order id from the isolate scope
    }
  }
});
