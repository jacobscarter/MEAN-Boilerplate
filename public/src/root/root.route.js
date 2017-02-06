(function() {
'use strict';

var root = null;
try {
  root = angular.module('root');
} catch (err) {
  root = angular.module('root', ['ui.router']);
}

root.config(['$stateProvider', config]);

function config($stateProvider) {

  $stateProvider.
      state('root', {
        url: '/',
        templateUrl: './views/root/root.view.html',
        controller: 'RootController',
        controllerAs: 'vm'
      });
}
})();
