'use strict';

angular
  .module('coolwallApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.sortable'
  ])
  .run(function($rootScope, $location, $http, LocalStorage, User) {
    
    /* Generic functions used by multiple controllers */
    $rootScope.showModal = function(id) {
      $(id).appendTo('body');
    }

    /* Check if user already logged in */
    if(LocalStorage.get("token")) {
      $http.defaults.headers.common.Authorization = LocalStorage.get("token");
      User.getCurrentUser().then(function(user) {
        $rootScope.user = user;
        $location.path('/home');
      });
    }
    else {
      $location.path('/login');
    }

  })
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        resolve: {
          walls: function(HomeService) {
            return HomeService.getWalls();
          }
        }
      })
      .when('/wall/:id', {
        templateUrl: 'wall/wall.html',
        controller: 'WallCtrl',
        resolve: {
          wall: function(WallService, $route) {
            return WallService.getWall($route.current.params.id);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
