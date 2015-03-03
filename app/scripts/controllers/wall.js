'use strict';

angular.module('coolwallApp')
  .controller('WallCtrl', function ($scope) {
    $scope.wall = {
      'id' : '1',
      'title' : 'wall one',
      'created' : 'one month ago',
      'members' : '5',
      'moderated' : 'true',
      'lanes': [
        {
          'id' : '1',
          'title' : 'lane one',
          'cards': [
            {
              'id' : 1,
              'title' : 'first card',
              'description' : 'small description'
            },
            {
              'id' : 2,
              'title' : 'second card',
              'description' : 'small description'
            }
          ]
        },
        {
          'id' : '2',
          'title' : 'lane two',
          'cards' : [
            {
              'id' : 1,
              'title' : 'first card',
              'description' : 'small description'
            },
            {
              'id' : 2,
              'title' : 'second card',
              'description' : 'small description'
            }
          ]
        }
      ]
    };

    $scope.addNewLane = function() {
      $scope.wall.lanes.push({'title' : $scope.newLaneName, 'id' : $scope.wall.lanes.length + 1, 'cards' : []});
      $scope.newLaneName = '';
      $('#newLaneInput').blur();
      $scope.showSaveLane = false;
    };

    $scope.sortableOptions = {
      placeholder: "lanePlaceholder",
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

  });
