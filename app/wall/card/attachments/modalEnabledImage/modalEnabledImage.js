'use strict';

angular.module('coolwallApp')
.directive('modalEnabledImage', function() {
	return {
		restrict : 'E',
		templateUrl : 'wall/card/attachments/modalEnabledImage/modalEnabledImage.html',
		scope: {
			attachment: '='
		},
		controller : function($scope, $rootScope) {
			$scope.showModal = function(id) {
				$rootScope.showModal(id);
			}
		}
	};
});