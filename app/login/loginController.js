'use strict';

angular.module('coolwallApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, Authentication, User) {
    
    $scope.login = function() {
    	Authentication.login($scope.user).then(function(user) {
    		$rootScope.user = user;
    		$location.path('/home');
    	},
        function(error) {
            $scope.errorMessage = error;
        });
    };

    $scope.register = function() {
        console.log($scope.newUser);
        User.register($scope.newUser).then(function(user) {
            $rootScope.user = user;
            $location.path('/home');
        }, 
        function(error) {
            $scope.errorMessage = error;
        })
    }

    $scope.showRegister = function() {

        $('#loginWell').removeClass('animatedIn');
        $('#registerWell').removeClass('animatedOut');

        $('#loginWell').addClass('animatedOut');
        $('#registerWell').addClass('animatedIn');
    }

    $scope.cancelRegister = function() {
        $('#loginWell').removeClass('animatedOut');
        $('#registerWell').removeClass('animatedIn');

        $('#loginWell').addClass('animatedIn');
        $('#registerWell').addClass('animatedOut');
    }

  });
