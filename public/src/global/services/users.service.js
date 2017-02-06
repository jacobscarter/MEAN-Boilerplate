(function() {
'use strict';

var app = null;
try {
  app = angular.module('app');
} catch (err) {
  app = angular.module('app', ['ui.router']);
}

app.service('UsersService', UsersService);

UsersService.$inject = [];

function UsersService() {

  /* jshint validthis: true */
  var service_ = this;
  /* jshint validthis: false */

  service_.currentUser = {};

  if (localStorage.getItem('user')) {
    service_.currentUser = JSON.parse(localStorage.getItem('user'));
  }

}

})();
