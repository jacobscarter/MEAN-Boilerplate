(function() {
'use strict';

var loginApp = null;
try {
  loginApp = angular.module('login');
} catch (err) {
  loginApp = angular.module('login', ['ui.router']);
}

loginApp.config(['$stateProvider', '$urlRouterProvider', config]);

function config($stateProvider, $urlRouterProvider) {
  // default route
  $urlRouterProvider.otherwise('/');

  $stateProvider.
      state('login', {
        url: '/login',
        templateUrl: '../views/login/login.view.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
}
})();
