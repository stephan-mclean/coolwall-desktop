'use strict';

angular.module('coolwallApp')
.directive('addWallTile', function() {
	return {
		restrict : 'E',
		templateUrl : 'home/addWallTile/addWallTile.html',
		scope: {
			walls: '='
		},
		controller : function($scope, $rootScope, HomeService) {
			$scope.showModal = function(id) {
				$rootScope.showModal(id);
				$(id).on('hidden.bs.modal', function() {
					$scope.wall.title = '';
				});
			};
			
			$scope.addWall = function() {
				HomeService.addWall($scope.wall).then(function(result) {
					$scope.wall.title = '';
					$scope.walls.push(result);
				})
			}
		}
	};
});