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
    product.reviews.forEach(function(review,id){
      return ProductFactory.getUser(review.userId)
      .then(user => {
        $scope.product.reviews[id].name = user.name;
      })
    })
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
    return $http.get('/api/users/' + id)
    .then(res => {
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

