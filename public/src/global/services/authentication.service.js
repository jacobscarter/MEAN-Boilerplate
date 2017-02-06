(function() {

var app = null;
try {
  app = angular.module('app');
} catch (err) {
  app = angular.module('app', ['ui.router']);
}

app.service('authService', authService);

authService.$inject = ['apiHelperService'];

function authService(apiHelperService) {

  var service = {};

  service.login = login_;

  return service;

  function login_(data) {
    return apiHelperService.postCall('login', data);
  }
}
})();

