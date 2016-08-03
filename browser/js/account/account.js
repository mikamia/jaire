app.factory('AccountFactory', function($http) {
    var AcctFactoryObj = {};

    AcctFactoryObj.getOrders = function(id) {
        console.log('reached factory');
        return $http.get('/api/orders/users/' + id)
        .then(function(res) {
            console.log('res',res.data);
            return res.data;
        });
    }

    AcctFactoryObj.updateUser = function(id, updatedInfo) {
        return $http.put('/api/users/' + id, updatedInfo)
        .then(function(res) {
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
    })
    .then(function() {
        AccountFactory.getOrders($scope.user.id)
        .then(function(orders) {
            console.log('orders',orders);
            $scope.orders = orders;
        });
    });

    $scope.sendUpdate = function() {
        AccountFactory.updateUser($scope.user.id, $scope.update)
        .then(function() {
            return AuthService.logout();
        });
    }

    // $scope.runGetOrders = function () {
    //     console.log($scope.user.id);
        
    // };
});

app.config(function ($stateProvider) {

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl'
    });

});

