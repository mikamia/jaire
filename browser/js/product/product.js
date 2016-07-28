app.controller('ProductController', function($scope, ProductFactory, $log, $stateParams) {
  var id = $stateParams.id;

  //needed for star rating
  $scope.range = function(n){
    var arr = [];
    for (var i = 0; i < n; i++) {
      arr.push(i);
    }
    return arr;
  }

  $scope.getUser = function(id){
    return ProductFactory.getUser()
    .then(user=>{
      return user;
    })
  }

  ProductFactory.getProduct(id)
  .then(product=>{

    $scope.product = product;
    $scope.product.rating = product.rating;
    console.log($scope.product);
    //$scope.product.rating = product.rating;
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

  productObj.getUser = function(id){
    return $http.get('api/user/' + id)
    .then(function(res=>{
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

