'use strict';

angular.module('coolwallApp')
.directive('lane', function() {
	return {
		restrict : 'E',
		templateUrl : 'views/directives/lane.html',
		scope: {
			lane: '='
		},
		controller : function($scope, $rootScope, $timeout) {
			$scope.startAddingCard = function() {
				$scope.addingCard = true;
				
				$timeout(function() {
		         	$('#lane' + $scope.lane.id)[0].scrollTop = $('#lane' + $scope.lane.id)[0].scrollHeight;
		        });

				$timeout(function() { /* Wrapped in timeout to ensure all other events have finished */
					$('#newCardInput' + $scope.lane.id).focus();
				});
			};

			$scope.showModal = function(id) {
				$rootScope.showModal(id);
			};

			$scope.addNewCard = function() {
				$scope.lane.cards.push({'id': $scope.lane.cards.length + 1, 'title': $scope.newCardName, 'description': ''});
				$scope.newCardName = '';
				$scope.startAddingCard();
			};

			$scope.sortableOptions = {
    		  placeholder: "cardPlaceholder",
    		  connectWith: ".connectedLane",
    		  start: function(event, ui) {
    		  	$(ui.placeholder[0]).css('height', $(ui.item[0]).height());
    		  	$(ui.item[0]).css({'-webkit-transform' : 'rotate(7deg)',
                 '-moz-transform' : 'rotate(7deg)',
                 '-ms-transform' : 'rotate(7deg)',
                 'transform' : 'rotate(7deg)'}).css('cursor', 'move');
    		  },
    		  stop: function(event, ui) {
    		  	$(ui.item[0]).css({'-webkit-transform' : 'none',
                 '-moz-transform' : 'none',
                 '-ms-transform' : 'none',
                 'transform' : 'none'}).css('cursor', 'pointer');
    		  }
    		};
		}
	};
});