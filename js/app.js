'use strict';

/* defining the app */
var app = angular
	.module("gallery", ['ui.router', 'ngResource', 'angular-growl', 'xeditable',
		'LocalStorageModule', 'ct.ui.router.extras', 'ngFileUpload', 'base64'])
	.config(['$stateProvider', '$urlRouterProvider', 'growlProvider', 
		function($stateProvider, $urlRouterProvider, growlProvider) {
    growlProvider.globalTimeToLive(5000);
    $urlRouterProvider.otherwise("/");   
      $stateProvider
        .state('home', {
          url: "/",
            templateUrl: "partials/home.html"
        })
        .state('login', {
          url: "/login",
            templateUrl: "partials/login.html",
            controller: 'userCtrl'
        })
        .state('signup', {
          url: "/signup",
            templateUrl: "partials/signup.html",
            controller: 'userCtrl'
        })
        .state('gallery', {
          url: "/gallery",
            templateUrl: "partials/list.html",
            controller: 'folderCtrl'
        })
          .state('photos', {
            url: "/selected_gallery/:name",
              templateUrl: "partials/photos.html",
             controller: 'folderCtrl'
          })
	}]);