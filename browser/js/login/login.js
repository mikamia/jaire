app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, $rootScope, AuthService, OrderFactory, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        $scope.error = null;
        AuthService.login(loginInfo).then(function () {
           return OrderFactory.continueCart();
        })
        .then(function() {
            $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
