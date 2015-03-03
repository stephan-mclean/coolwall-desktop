'use strict';

angular.module('coolwallApp')
.directive('addWallTile', function() {
	return {
		restrict : 'E',
		templateUrl : 'views/directives/addWallTile.html',
		controller : function($scope) {
		}
	};
});