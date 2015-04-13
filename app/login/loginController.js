'use strict';

angular.module('coolwallApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, Authentication) {
    
    $scope.login = function() {
    	Authentication.login($scope.user).then(function(user) {
    		$rootScope.user = user;
    		$location.path('/home');
    	},
        function(error) {
            $scope.errorMessage = error;
        });
    	
    };

  });
