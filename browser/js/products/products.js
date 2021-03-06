app.controller('ProductsController', function($scope, ProductsFactory, $log) {
  $scope.currCategory = null;
  var allProducts = null;
  
  function resetCategory() {
    $scope.currCategory = null;
    ProductsFactory.getAllProducts()
    .then(products =>{
      $scope.products = products;
      allProducts = products;
    })
    .catch($log.error);
  }


  $scope.submit = function() {
    $scope.currCategory = true;
    var filterProduct = allProducts.filter(function(product) {
      var lcProduct = product.name.toLowerCase();
      var scopeProduct = $scope.search.toLowerCase();
      return lcProduct.includes(scopeProduct);
    });
    $scope.products = filterProduct;
  };

  $scope.setCategory = function(tag) {
    $scope.currCategory = tag;
    console.log($scope.currCategory);
    if (!$scope.currCategory) {
      resetCategory();
    } else {
      ProductsFactory.getByTag($scope.currCategory)
      .then(results =>{
        $scope.products = results;
      })
      .catch($log.error);
    }
    
  };

  ProductsFactory.getAllTags()
  .then(tags =>{
    tags = Array.from(tags);
    $scope.allTags = tags;
    console.log(tags);
  });

  if (!$scope.currCategory) {
    resetCategory();
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

