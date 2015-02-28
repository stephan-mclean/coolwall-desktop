'use strict';

angular.module('coolwallApp')
  .controller('HomeCtrl', function ($scope) {
  	$scope.walls = [
  		{
  			'id' : '1',
  			'title' : 'wall one',
  			'created' : 'one month ago',
  			'members' : '5',
  			'moderated' : 'true'
  		},
  		{
  			'id' : '1',
  			'title' : 'wall one',
  			'created' : 'one month ago',
  			'members' : '5',
  			'moderated' : 'true'
  		},
  		{
  			'id' : '1',
  			'title' : 'wall one',
  			'created' : 'one month ago',
  			'members' : '5',
  			'moderated' : 'true'
  		},
  		{
  			'id' : '1',
  			'title' : 'wall one',
  			'created' : 'one month ago',
  			'members' : '5',
  			'moderated' : 'true'
  		},
  	];
  });
