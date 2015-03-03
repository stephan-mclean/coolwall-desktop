'use strict';

angular.module('coolwallApp')
.directive('tile', function() {
	return {
		restrict : 'E',
		templateUrl : 'views/directives/tile.html',
		scope: {
			wall: '='
		},
		controller : function($scope, $location) {
			$scope.showWall = function() {
				$location.path('/wall/' + $scope.wall.id);
			};
		}
	};
});