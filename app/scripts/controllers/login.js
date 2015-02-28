'use strict';

angular.module('coolwallApp')
  .controller('LoginCtrl', function ($scope, $location) {
    
    $scope.login = function() {
    	/* Use login service here */
    	$location.path('/home');
    };

  });
