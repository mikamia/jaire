app.controller('ProductsController', function($scope, ProductsFactory) {
  ProductsFactory.getAllProducts()
  .then(products =>{
    $scope.products = products;
  });

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
});


app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsController'
    });

});

