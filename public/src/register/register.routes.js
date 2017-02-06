(function() {
'use strict';

var registerApp = null;
try {
  registerApp = angular.module('register');
} catch (err) {
  registerApp = angular.module('register', ['ui.router']);
}

registerApp.config(['$stateProvider', '$urlRouterProvider', config]);

function config($stateProvider, $urlRouterProvider) {

  // default route
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: './views/register/register.view.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    });
}
})();
