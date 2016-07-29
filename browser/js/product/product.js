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

  function calculateRating(reviews){
    var sum = 0;
    for(var x=0; x<reviews.length; x++){
      sum += reviews[x].stars;
    }
    var avg = sum/(reviews.length+1);
    return Math.round(avg);
  }

  ProductFactory.getProduct(id)
  .then(product=>{

    $scope.product = product;
    $scope.product.rating = calculateRating(product.reviews);

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
    .then(res => {
      return res.data;
    })
  }

  return productObj;
});

app.factory('OrderFactory', function($http){
  var orderObj = {}

  orderObj.addToOrder = function(product, productQty){
    return $http.post('api/orders', {
      productId: product.id,
      price: product.price,
      qty: productQty
    })
    .then(function(res){
      return res;
    })
  }

  orderObj.removeFromOrder=function(product){
    // return $http.destroy or whatever it is
    return
  }

  orderObj.updateQty=function(product){
    //get order product and update qty field
    return
  }
  
  return orderObj;
})

app.config(function ($stateProvider) {

    $stateProvider.state('product', {
        url: '/product/:id',
        templateUrl: 'js/product/product.html',
        controller: 'ProductController'
    });

});

