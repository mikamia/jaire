app.controller('ProductsController', function($scope, ProductsFactory, $log) {
  $scope.currCategory = [];
  $scope.setCategory = function(tag) {
    $scope.currCategory.push(tag);
    console.log($scope.currCategory);
    var promises = $scope.currCategory.map(category=>{
      return ProductsFactory.getByTag(category);
    });
    Promise.all(promises)
    .then(results =>{
      results.forEach(result=>{
        $scope.products = $scope.products.concat(result);
      });
    })
    .catch($log.error);
  };

  ProductsFactory.getAllTags()
  .then(tags =>{
    tags = Array.from(tags);
    $scope.allTags = tags;
    console.log(tags);
  });

  if ($scope.currCategory.length === 0) {
    ProductsFactory.getAllProducts()
    .then(products =>{
      $scope.products = products;
    })
    .catch($log.error);
  }
  

});

app.factory('ProductsFactory', function($http) {
  var productsObj = {};

  productsObj.getAllProducts = function() {
    return $http.get('/api/products')
      .then(function(res) {
        return res.data;
      })
  }

  productsObj.getByTag = function (tag) {
    return $http.get('/api/products/filter/' + tag)
    .then(function(res) {
      return res.data;
    });
  }

  productsObj.getAllTags = function(){
    return this.getAllProducts()
    .then(products =>{
      var tags = [];
      products.forEach(product=>{
        tags = tags.concat(product.tags);
      });
      tags = new Set(tags);
      return tags;
    });
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

