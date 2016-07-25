app.controller('ProductsController', function($scope, ProductsFactory, products) {

  $scope.products = products;


});

app.factory('ProductsFactory', function($http) {
  var productsObj = {};

  productsObj.getAllProducts = function() {
    return $http.get('/api/products')
      .then(function(res) {
        return res.data;
      })
  }

  return productsObj;
})
