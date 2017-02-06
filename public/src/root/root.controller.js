(function() {
'use strict';

var root = null;
try {
  root = angular.module('root');
} catch (err) {
  root = angular.module('root', ['ui.router']);
}

root.controller('RootController', RootController);

RootController.$inject = ['$scope', '$mdSidenav', 'UsersService'];

function RootController($scope, $mdSidenav, UsersService) {

  var vm_ = this;

  vm_.toggleSideNav = toggleSideNav_('left');
  vm_.currentUser = UsersService.currentUser;

  function toggleSideNav_(navID) {
    return function() {
      $mdSidenav(navID).toggle();
    };
  }
}
})();
