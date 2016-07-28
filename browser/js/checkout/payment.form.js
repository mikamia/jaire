app.config(function($stateProvider) {

  $stateProvider.state('checkout', {
    url: '/checkout',
    templateUrl: 'js/checkout/payment.form.html',
    // controlelr: 'CheckoutCtrl'
  });
});
