'use strict';

angular
  .module('coolwallApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.sortable'
  ])
  .run(function($rootScope, $location, $http, LocalStorage, User, Notifications) {
    
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

      Notifications.getNotifications().then(function(result) {
        $rootScope.notifications = result;
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
      .when('/error', {
        templateUrl: 'error/error.html',
        controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      /*
          HTTP Interceptor to handle errors
      */
      var interceptor = ['$q', '$injector', function ($q, $injector) {

        function success(response) {
            return response;
        }

        function error(response) {
            var status = response.status;
            
            /* Handle 403 & 500 Errors */
            if(status == 403) {
                $injector.get('$rootScope').errorMessage = response.data;
                $injector.get('$location').path('/error');
                return $q.reject(response);
            }
            else if(status == 500) {
              $injector.get('$rootScope').errorMessage = 'Something went wrong..';
              $injector.get('$location').path('/error');
              return $q.reject(response);
            }
            else if(status == 401) {
              
              if($injector.get('$location').path() != '/login' && $injector.get('$location').path() != '/') {
                $injector.get('$location').path('/login');
              }
              return $q.reject(response);
            }
            
            /* Otherwise let the UI decide what to do */
            return $q.reject(response);
        }

        return function (promise) {
            return promise.then(success, error);
        }
      }];

      $httpProvider.defaults.useXDomain = true;
      $httpProvider.responseInterceptors.push(interceptor);
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
