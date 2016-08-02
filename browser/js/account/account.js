app.factory('AccountFactory', function($http) {
    var AcctFactoryObj = {};

    AcctFactoryObj.getOrders = function(id) {
        return $http.get('/api/orders/' + id)
        .then(function(res) {
            return res.data;
        });
    }

    AcctFactoryObj.updateUser = function(id, updatedInfo) {
        console.log('reached', id);
        return $http.put('/api/users/' + id, updatedInfo)
        .then(function(res) {
            console.log('res.data', res);
            return res.data;
        });
    }

    return AcctFactoryObj;
});

app.controller('AccountCtrl', function ($scope, AccountFactory, AuthService, OrderFactory) {

    AuthService.getLoggedInUser(true)
    .then(function(loggedInUser) {
        $scope.user = loggedInUser;
        return loggedInUser.data;
    });

    AccountFactory.getOrders()
    .then(function(orders) {
        $scope.orders = orders;
    });

    $scope.sendUpdate = function() {
        console.log('here');
        console.log('scope.user',$scope.user);
        AccountFactory.updateUser($scope.user.id, $scope.update)
        .then(function() {
            console.log('something');
            return AuthService.logout();
        })
        // .then(function() {
        //     $state.go('login');
        // })
    }
});

app.config(function ($stateProvider) {

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl'
    });

});

