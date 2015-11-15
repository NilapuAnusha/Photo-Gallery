'use strict';

/* Controller */

app
	.controller('userCtrl',['$scope', '$http','growl', '$rootScope', '$location', 
    'localStorageService', '$previousState',
		function($scope, $http, growl, $rootScope, $location, localStorageService,
      $previousState){
		var _scope = {};
		_scope.init = function(){
      var lsKeys = localStorageService.keys();
      var previous = $previousState.get();
      if(lsKeys.indexOf('usersList') != -1) {
        $scope.userList = localStorageService.get('usersList');
      } else {
        getUsers();
      }
      if(previous !== null) {
        if(previous.state.name == 'login') {
            localStorageService.remove('usersList');
        }
      }
      console.log('fsdf', $scope.userList);
		}

    var getUsers = function() {
      $http.get('/static/users.json',{cache: true}).
        success(function(response, status, headers, config) {
          $scope.userList = response.users;
          console.log('$scope.userList', $scope.userList);
        }).error(function(data) {
          console.log('not entered');
        });
    }
    
    $scope.login = function (user) {
      if(user) {
        var exist = false;
        for (var i = 0; i < $scope.userList.length; i++) {
          if($scope.userList[i].username === user.username) {
            exist = true;
            var info = $scope.userList[i];
          }
        };
        if (exist === true) {
          if(info.password === user.password) {
            $rootScope.userInfo = info;
            localStorageService.set('user', $rootScope.userInfo);
            console.log('login info', $rootScope.userInfo);
            $location.path('/gallery');
            growl.addSuccessMessage("Successfully Logged in");
          } else {
            growl.addErrorMessage("password is incorrect");
          }
        } else {
          growl.addErrorMessage("username is incorrect");
        }
      } else {
        growl.addErrorMessage("fill the form");
      }
    }

    $scope.signup = function (details) {
      if(details) {
        var exist = false;
        for (var i = 0; i < $scope.userList.length; i++) {
          if($scope.userList[i].username === details.username) {
            exist = true;
          }
        };
        if(exist === false) {
          if ($scope.userList) {
            details.id = $scope.userList.length - 1;
          } else {
            details.id = 0;
          }
          $scope.userList.push(details);
          localStorageService.set('usersList', $scope.userList);
          var lsKeys = localStorageService.keys();
          console.log('***************', lsKeys);
          $location.path('/login');
        } else {
          growl.addErrorMessage("username has already taken");
        }
      } else {
        growl.addErrorMessage("fill the form");
      }
    }

    $scope.logout = function () {
      delete $rootScope.userInfo;
      localStorageService.clearAll();
      $location.path('/login');
    }

    _scope.init();
	}]);