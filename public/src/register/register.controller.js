(function() {
'use strict';

var registerApp = null;
try {
  registerApp = angular.module('register');
} catch (err) {
  registerApp = angular.module('register', ['ui.router']);
}

registerApp.controller('RegisterController', RegisterController);

RegisterController.$inject = ['$state', '$mdDialog', 'registerService'];

function RegisterController($state, $mdDialog, registerService) {

  var vm_ = this;
  var alert_ = null;
  var warning_ = null;

  vm_.user = {};

  vm_.register = register_;

  /**
   * Validate and send new suer info to the server.
   */
  function register_() {

    //Check that all required fields are filled out.
    if (vm_.user.firstName && vm_.user.lastName && vm_.user.email && vm_.user.username && vm_.user.password) {

      //Send request to register service.
      registerService.registerUser(vm_.user).
          then(function() {

            //User registration successfull.
            $state.go('login');
          }).
          catch(function(error) {

            //Display alert with error message.
            alert_ = $mdDialog.alert({
              title: 'Registration Error',
              textContent: error,
              ok: 'Okay'
            });

            $mdDialog.
                show(alert_);
          });
    } else {
      //Display alert with error message.
      warning_ = $mdDialog.alert({
        title: 'Required Fields',
        textContent: 'Please fill out all required fields',
        ok: 'Okay'
      });

      $mdDialog.
          show(warning_);
    }
  }
}
})();
