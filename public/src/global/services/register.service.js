(function() {
'use strict';

var app = null;
try {
  app = angular.module('app');
} catch (err) {
  app = angular.module('app', ['ui.router']);
}

app.service('registerService', registerService);

registerService.$inject = ['apiHelperService'];

function registerService(apiHelperService) {

  /* jshint validthis: true */
  var service_ = this;
  /* jshint validthis: false */

  service_.registerUser = registerUser_;

  /**
   * Register a new user.
   *
   * @param {Object} userObject Information about the new user registering.
   */
  function registerUser_(userObject) {
    return apiHelperService.postCall('register', userObject);
  }
}

})();
