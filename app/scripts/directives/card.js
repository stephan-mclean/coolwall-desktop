'use strict';

angular.module('coolwallApp')
.directive('card', function() {
	return {
		restrict : 'E',
		templateUrl : 'views/directives/card.html',
		scope: {
			card: '='
		},
		controller : function($scope, $rootScope, $timeout) {
			$scope.showModal = function(id) {
				$rootScope.showModal(id);
			};
		}
	};
});