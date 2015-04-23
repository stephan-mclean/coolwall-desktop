'use strict';

angular.module('coolwallApp')
.directive('comments', function() {
	return {
		restrict : 'E',
		templateUrl : 'wall/card/comments/comments.html',
		scope: {
			user: '=',
			card: '=',
			comments: '='
		},
		controller : function($scope, CardService) {
			$scope.addComment = function() {
				CardService.addComment($scope.card.id, $scope.comment).then(function(result) {
					$scope.comment.text = '';
					$scope.comments.push(result);
				});
			};

			$scope.deleteComment = function(comment) {
				CardService.deleteComment(comment.id).then(function(result) {
					var index = $scope.comments.indexOf(comment);
					if(index > -1) {
						$scope.comments.splice(index, 1);
					}
				});
			};
		}
	};
});