app.controller('ProductController', function($scope, ProductFactory, $log, $stateParams) {
  var id = $stateParams.id
  ProductFactory.getProduct(id)
  .then(product=>{
    console.log(product);
    $scope.product = product;
    if(!$scope.product.imageUrl){
      $scope.product.imageUrl = 'http://www.beniceorleavethanks.com/wp-content/uploads/2015/05/Mason-Jar-Sipper.jpg';
    }
  })
  .catch($log.error);

});

app.factory('ProductFactory', function($http) {
  var productObj = {};

  productObj.getProduct = function(id) {
    return $http.get('/api/products/' + id)
      .then(function(res) {
        return res.data;
      })
  }

  return productObj;
});


app.config(function ($stateProvider) {

    $stateProvider.state('product', {
        url: '/product/:id',
        templateUrl: 'js/product/product.html',
        controller: 'ProductController'
    });

});

