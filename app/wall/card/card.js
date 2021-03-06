'use strict';

angular.module('coolwallApp')
.directive('card', function() {
	return {
		restrict : 'E',
		templateUrl : 'wall/card/card.html',
		scope: {
			card: '=',
			cards: '='
		},
		controller : function($scope, $rootScope, $timeout, CardService, MemberService) {
			$scope.editingDescription = false;

			$scope.user = $rootScope.user;


			$scope.showModal = function(id) {

				// Load extra card details before modal is shown
				if(!$scope.card.comments) {
					CardService.getComments($scope.card.id).then(function(result) {
						$scope.card.comments = result;
					});
				}

				if(!$scope.card.members) {
					CardService.getMembers($scope.card.id).then(function(result) {
						$scope.card.members = result;
					});
				}

				if(!$scope.card.attachments) {
					CardService.getAttachments($scope.card.id).then(function(result) {
						$scope.card.attachments = result;
					});
				}

				$rootScope.showModal(id);
				$(id).on('hidden.bs.modal', function(e) {
					$scope.editingDescription = false;
				});
			};

			$scope.updateCard = function() {
				var updatedCard = {
					'title' : $scope.card.title,
					'description' : $scope.card.description,
				};
				CardService.updateCard($scope.card.id, updatedCard).then(function(result) {
					$.snackbar(
						{
							content: "Card updated successfully!",
							style: "snackbarSuccess"
						}
					);
				}, function(error) {
					$.snackbar(
						{
							content: "Something went wrong updating the card. Please try again.",
							style: "snackbarDanger"
						}
					);
				});
			};

			$scope.deleteCard = function() {
				CardService.deleteCard($scope.card.id).then(function(result) {
					console.log(result);
					var index = $scope.cards.indexOf($scope.card);
					if(index > -1) {
						$scope.cards.splice(index, 1);
					}
				})
			}

			$scope.searchMembers = function(search) {
		      return MemberService.searchWallMembers($scope.card.wallId, search);
		    };

		    $scope.addMember = function(user) {
		      return MemberService.addCardMember($scope.card.id, user);
		    };

		    $scope.deleteMember = function(member) {
		    	return MemberService.deleteCardMember($scope.card.id, member.id);
		    }
		}
	};
});