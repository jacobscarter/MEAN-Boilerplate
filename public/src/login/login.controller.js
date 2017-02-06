(function() {
'use strict';

var loginApp = null;
try {
  loginApp = angular.module('login');
} catch (err) {
  loginApp = angular.module('login', ['ui.router']);
}

loginApp.controller('LoginController', LoginController);

LoginController.$inject = ['$state', '$http', 'authService', 'UsersService'];

function LoginController($state, $http, authService, UsersService) {

  var vm_ = this;

  vm_.user = {};

  vm_.login = login_;

  /**
   * Send user credentials and recieve jwt token back.
   */
  function login_() {
    authService.login(vm_.user).
        then(function(data) {
          $http.defaults.headers.common.Authorization = 'Bearer ' + data.result.token;
          window.localStorage.setItem('userToken', data.result.token);
          window.localStorage.setItem('user', JSON.stringify(data.result.user));
          UsersService.currentUser = data.result.user;
          $state.go('root');
        }).
        catch(function(error) {
          window.alert(JSON.stringify(error));
        });
  }
}
})();
