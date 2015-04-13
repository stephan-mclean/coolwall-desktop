'use strict';

angular.module('coolwallApp')
.directive('tile', function() {
	return {
		restrict : 'E',
		templateUrl : 'home/tile/tile.html',
		scope: {
			wall: '=',
			walls: '='
		},
		controller : function($scope, $rootScope, $location, HomeService) {
			$scope.deleteModalOpen = false;

			$scope.deleteWall = function() {
				HomeService.deleteWall($scope.wall.id).then(function(result) {
					var index = $scope.walls.indexOf($scope.wall);
					if(index > -1) {
						$scope.walls.splice(index, 1);
					}
				});
			}

			$scope.showModal = function(id) {
				$scope.deleteModalOpen = true;
				$rootScope.showModal(id);
				$('#wall' + $scope.wall.id + 'DeleteModal').on('hidden.bs.modal', function(e) {
					$scope.deleteModalOpen = false;
				});
			}

			$scope.showWall = function() {
				if(!$scope.deleteModalOpen) {
					$location.path('/wall/' + $scope.wall.id);
				}
			};
		}
	};
});