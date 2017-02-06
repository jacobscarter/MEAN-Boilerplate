
'use strict';

var app = angular.module('app',[
    'ui.router',
    'ngMaterial',
    'ngAnimate',
    'angularFileUpload',
    'root',
    'photos',
    'login',
    'register'
]);
//insert upload app when ready

app.config(config);

app.run(run);

function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {

  $mdThemingProvider
    .theme('default')
    .primaryPalette('teal')
    .accentPalette('green')
    .warnPalette('red');
  // default route
  $urlRouterProvider.otherwise('/login');

}

function run($http, $rootScope, $window, $state, $mdSidenav) {
  // add JWT token as default auth header
  $http.defaults.headers.common.Authorization = 'Bearer ' + window.localStorage.getItem('userToken');

  // update active tab on state change
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    //Checking that user has a token.
    if (!window.localStorage.getItem('userToken') && toState.name !== 'register') {
      $state.go('login');
    }

    $mdSidenav('left').close();
  });
}
