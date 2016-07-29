app.config(function ($stateProvider) {
  $stateProvider.state('reviewOrder', {
    url: '/review-order',
    templateUrl: 'js/review-order/review-order-form.html',
    controller: 'ReviewOrderCtrl'
  });
});

app.controller('ReviewOrderCtrl', function ($scope) {
  console.log('hello');
});
