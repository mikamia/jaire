app.controller('ProductController', function($scope, OrderFactory, AuthService, ProductFactory, $log, $stateParams, $state) {
  var user = null;
  var id = $stateParams.id;
  $scope.productQty = "1";
  //needed for star rating
  $scope.range = function(n){
    var arr = [];
    for (var i = 0; i < n; i++) {
      arr.push(i);
    }
    return arr;
  }

  AuthService.getLoggedInUser(true)
  .then(function(loggedInUser) {
    if (loggedInUser === null) {
      $scope.loggedIn = false;
    }
    else {
      $scope.loggedIn = true;
      user = loggedInUser;
      console.log('authservice data', loggedInUser);
      return loggedInUser.data;
    }
  });

  $scope.createReview = function() {
    console.log('reached');
    $scope.newReview.userId = user.id;
    $scope.newReview.productId = id;
    $scope.hasSubmitted = true;
    ProductFactory
    .create($scope.newReview)
    .then(function(review) {
      console.log('review object', review);
      $state.go('product')
    })
    .catch(function(err) {
      $scope.hasSubmitted = false;
      $scope.servError = err.message || 'We weren\'t able to add your review. Try again later.';
    });
  }

  $scope.addSuccess=false;

  $scope.addToCart = function(product, productQty){
    return OrderFactory.addToOrder(product, productQty)
    .then(function(){
      $scope.addSuccess=true;
    })
    .catch($log.error)
  }

  function calculateRating(reviews){
    var sum = 0;
    for(var x=0; x<reviews.length; x++){
      sum += reviews[x].stars;
    }
    var avg = sum/(reviews.length+1);
    return Math.round(avg);
  }

  $scope.stars = [{ value: '5',
                    label: '\u2605' + '\u2605' + '\u2605' + '\u2605' + '\u2605' },
                  { value: '4',
                    label: '\u2605' + '\u2605' + '\u2605' + '\u2605' + '\u2606' },
                  { value: '3',
                    label: '\u2605' + '\u2605' + '\u2605' + '\u2606' + '\u2606' },
                  { value: '2',
                    label: '\u2605' + '\u2605' + '\u2606' + '\u2606' + '\u2606' },
                  { value: '1',
                    label: '\u2605' + '\u2606' + '\u2606' + '\u2606' + '\u2606' },
                  ]

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
    //console.log($scope.product);
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

  productObj.create = function (data) {
    console.log(data);
    return $http.post('/api/reviews', data)
    .then(function(res) {
      return res.data;
    });
  };

  return productObj;
});

app.factory('OrderFactory', function($http){
  var orderObj = {}

  orderObj.getOrder = function(id){
    return $http.get('api/orders/' + id)
    .then(function(res){
      return res.data;
    })
  }

  orderObj.addToOrder = function(product, productQty){
    return $http.post('api/orders/', {
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
    return $http.put('api/orders/' + product.id, product)
    .then(function(res){
      return res.data
    })
  }
  
  return orderObj;
})

app.config(function ($stateProvider) {

    $stateProvider.state('product', {
        url: '/product/:id',
        templateUrl: 'js/product/product.html',
        controller: 'ProductController',
        // resolve: {
        //   updateReview: function(ProductFactory, $stateParams) {
        //     return ProductFactory.create($stateParams.id);
        //   }
        // }
    });

});

