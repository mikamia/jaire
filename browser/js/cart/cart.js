// app.controller('CartController', function($scope, CartFactory, $log) {


// });

// app.factory('CartFactory', function($http) {

// });

app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    // controller: 'CartController'
  });
});

//go through and display every thing in the current cart (session id?)
//