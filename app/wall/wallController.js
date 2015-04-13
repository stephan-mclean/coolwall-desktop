'use strict';

angular.module('coolwallApp')
  .controller('WallCtrl', function ($scope, $rootScope, $timeout, $location, wall, WallService, HomeService, MemberService) {
    $scope.wall = wall;

    $scope.showModal = function(id) {
      $(id).on('show.bs.modal', function() {
        WallService.getMembers($scope.wall.id).then(function(result) {
          $scope.wall.members = result;
        });
      });
      $rootScope.showModal(id);
    }

    $scope.startAddingLane = function() {
      $timeout(function() { 
        $('#newLaneInput').focus();
      });
    }

    $scope.addNewLane = function() {
      var lane = {'title' : $scope.newLaneName};
      WallService.addLane($scope.wall.id, lane).then(function(result) {
        $scope.wall.lanes.push(result);
      });
      $scope.newLaneName = '';
      $timeout(function() {
        $('#newLaneInput').blur();  
      });
      $scope.showSaveLane = false;
    };

    $scope.deleteWall = function() {
      HomeService.deleteWall($scope.wall.id).then(function(result) {
        $location.path('/home');
      })
    };

    $scope.updateWall = function() {
      var updatedWall = {'title' : $scope.wall.title};
      WallService.updateWall($scope.wall.id, updatedWall).then(function(result) {
        // Check for errors
      });
    };

    $scope.searchMembers = function(search) {
      return MemberService.searchAllUsers(search);
    };

    $scope.addMember = function(user) {
      return MemberService.addWallMember($scope.wall.id, user);
    }

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
