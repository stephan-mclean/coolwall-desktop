'use strict';

angular.module('coolwallApp')
.directive('lane', function() {
	return {
		restrict : 'E',
		templateUrl : 'wall/lane/lane.html',
		scope: {
			lanes: '=',
			lane: '='
		},
		controller : function($scope, $rootScope, $timeout, LaneService, CardService) {
			
			$scope.showModal = function(id) {
				$rootScope.showModal(id);
			};

			$scope.sortCards = function() {
				/* Card sorting on start */
				function compare(a, b) {
					if(a.ordinal < b.ordinal) {
						return -1;
					}
					else if(a.ordinal > b.ordinal) {
						return 1;
					}
					return 0;
				}

				$scope.lane.cards.sort(compare);
			}

			$scope.sortCards();

			$scope.startAddingCard = function() {
				$scope.addingCard = true;
				
				$timeout(function() {
		         	$('#lane' + $scope.lane.id)[0].scrollTop = $('#lane' + $scope.lane.id)[0].scrollHeight;
		        });

				$timeout(function() { /* Wrapped in timeout to ensure all other events have finished */
					$('#newCardInput' + $scope.lane.id).focus();
				});
			};

			$scope.addNewCard = function() {
				var ordinal = $scope.lane.cards.length;
				var card = {'title' : $scope.newCardName, 'ordinal' : ordinal + ""};
				LaneService.addCard($scope.lane.id, card).then(function(result) {
					$scope.lane.cards.push(result);
				})
				$scope.newCardName = '';
				$scope.startAddingCard();
			};

			$scope.deleteLane = function() {
				LaneService.deleteLane($scope.lane.id).then(function(res) {
					var index = $scope.lanes.indexOf($scope.lane);
					if(index > -1) {
						$scope.lanes.splice(index, 1);
					}
				})
			};

			$scope.updateLane = function() {
				var updatedLane = {'title' : $scope.lane.title};
				LaneService.updateLane($scope.lane.id, updatedLane).then(function(result) {
					// Check for errors
				})
			}

			$scope.updateCardsSorting = function(startPos, index, cards) {
				if(cards == null || cards == undefined) {
					cards = $scope.lane.cards;
				}
				console.log("Sorting from: " + startPos + " to" + index);
				var i;
				if(index < startPos) {
					i = index;
				}
				else {
					i = startPos;
				}
				while(i < cards.length && i >= 0) {
					cards[i].ordinal = i;
					var updatedCard = {'ordinal' : cards[i].ordinal + ""};
					CardService.updateCard(cards[i].id, updatedCard).then(function(result) {
    		 			console.log(result);
    		 		});
					i++;
				}
			}

			$scope.sortableOptions = {
    		  placeholder: "cardPlaceholder",
    		  connectWith: ".connectedLane",
    		  start: function(event, ui) {
    		  	//$(ui.placeholder[0]).css('border-top-width', $(ui.item[0]).height());
    		  	$(ui.placeholder[0]).css('height', $(ui.item[0]).height());
    		  	$(ui.item[0]).css({'-webkit-transform' : 'rotate(7deg)',
                 '-moz-transform' : 'rotate(7deg)',
                 '-ms-transform' : 'rotate(7deg)',
                 'transform' : 'rotate(7deg)'}).css('cursor', 'move');
    		  	ui.item.data = $scope.lane.cards[ui.item.index()];
    		  	ui.item.startPos = ui.item.index();

    		  },
    		  stop: function(event, ui) {
    		  	$(ui.item[0]).css({'-webkit-transform' : 'none',
                 '-moz-transform' : 'none',
                 '-ms-transform' : 'none',
                 'transform' : 'none'}).css('cursor', 'pointer');
    		  	if(ui.item.index() != -1) {
    		 		// Sorted in this list, update ordinal for all cards
    		 		var index = ui.item.index();
    		 		var updatedCard = {"ordinal": index};
    		 		$scope.updateCardsSorting(ui.item.startPos, index, undefined);
    		 	}
    		 	else {
    		 		ui.item.data.targetOrdinal = ui.item.sortable.dropindex;
    		 		// Update card with new lane ID and ordinal
    		 		var updatedCard = {'ordinal' : ui.item.data.targetOrdinal + "", 'laneId' : ui.item.data.targetLane + ""};
    		 		CardService.updateCard(ui.item.data.id, updatedCard).then(function(result) {
    		 			console.log(result);
    		 		});
    		 		$scope.updateCardsSorting(0, 0, undefined); // Update for this lane with card removed
    		 		$scope.updateCardsSorting(ui.item.data.targetOrdinal + 1, ui.item.data.targetOrdinal + 1, ui.item.data.targetLaneCards) // Update for new lane with card inserted
    		 	}
    		 	
    		  },
    		  receive : function(event, ui) {
    		  	/* Received from another list */
    		  	ui.item.data.targetLane = $scope.lane.id;
    		  	ui.item.data.targetLaneCards = $scope.lane.cards;
    		  }
    		};
		}
	};
});