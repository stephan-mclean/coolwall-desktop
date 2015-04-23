'use strict';

angular.module('coolwallApp')
  .controller('HomeCtrl', function ($scope, walls) {
  	$scope.walls = walls;
});
