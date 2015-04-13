'use strict';

angular.module('coolwallApp')
.directive('topNav', function() {
	return {
		restrict : 'E',
		templateUrl : 'shared/topnav/topNav.html',
		scope: {
			user: '='
		},
		controller : function($scope) {
			
		}
	};
});