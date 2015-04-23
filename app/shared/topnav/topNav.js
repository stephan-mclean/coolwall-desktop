'use strict';

angular.module('coolwallApp')
.directive('topNav', function() {
	return {
		restrict : 'E',
		templateUrl : 'shared/topnav/topNav.html',
		scope: {
			user: '=',
			notifications: '='
		},
		controller : function($scope, $rootScope, $location, Authentication, Notifications) {
			$scope.showModal = function(id) {
				$rootScope.showModal(id);
			};

			$scope.logout = function() {
				Authentication.logout().then(function(result) {
					$location.path('/login');
				});
			};

			$scope.markNotificationsAsRead = function() {
				Notifications.markAllRead().then(function(result) {
					$rootScope.notifications = [];
				});
			};
		}
	};
});