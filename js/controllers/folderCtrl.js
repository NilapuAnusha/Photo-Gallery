'use strict';

/* Controller */

app
	.controller('folderCtrl',['$scope', '$http','growl', '$rootScope', '$location',
  'localStorageService', '$previousState', '$state', '$stateParams',
		function($scope, $http, growl, $rootScope, $location, localStorageService,
      $previousState, $state, $stateParams){
		var _scope = {};
		_scope.init = function(){
      $scope.isNew = false;
      $scope.file = {};
      $scope.folders = [];
      $scope.images = [];
      var previous = $previousState.get();
      var lsKeys = localStorageService.keys();
      console.log('storage keys', lsKeys);
      console.log('previous url', previous);
      // checking folders data
      if(lsKeys.indexOf('foldersList') != -1){
        $scope.folders = localStorageService.get('foldersList');;
      } else {
        $scope.folders = [];
      }
      // checking userinfo
      if(lsKeys.indexOf('user') != -1){
        $rootScope.userInfo = localStorageService.get('user');;
      }
      if($state.current.name === 'gallery' || $state.current.name === 'photos') {
        if(!$rootScope.userInfo) {
          $location.path("/login");
        }
      }

      // if(previous !== null) {
      //   if(previous.state.name == 'login') {
      //       localStorageService.remove();
      //   }
      // }
      if($stateParams.name) {
        $scope.images = localStorageService.get($stateParams.name);
      }
		}
    
    $scope.createFolder = function (val) {
      if(val) {
        var obj = {};
        obj.id = $scope.folders.length;
        obj.name = val;
        $scope.folders.push(obj);
        $scope.isNew = false;
        localStorageService.set('foldersList', $scope.folders);
      }
    }

    $scope.changeView = function(value) {
      $scope.isNew = !value;
    }

    $scope.uploadPic = function(picFile) {
      if(picFile) {
        if(!$scope.images) {
           $scope.images = [];
        }
        for (var i = 0; i < picFile.length; i++) {
                console.log('picFile', picFile[i]);
          $scope.images.push(picFile[i]); 
        };
        localStorageService.set($stateParams.name, $scope.images);
      }
      console.log('original', localStorageService.get($stateParams.name));
      $scope.picFile= '';
    }
    
    _scope.init();
	}]);