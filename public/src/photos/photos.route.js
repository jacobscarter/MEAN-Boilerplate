(function() {
'use strict';

var photos = null;
try {
  photos = angular.module('photos');
} catch (err) {
  photos = angular.module('photos', ['ui.router']);
}

photos.config(['$stateProvider', config]);

function config($stateProvider) {

  $stateProvider.
    state('root.photos', {
      url: 'photos/',
      views: {
        'workspace': {
          templateUrl: './views/photos/photos.view.html',
          controller: 'PhotosController',
          controllerAs: 'vm'
        }
      }
    }).
    state('root.newPhoto', {
      url: 'photos/new',
      views: {
        'workspace': {
          templateUrl: './views/photos/create-photo/create-photo.view.html',
          controller: 'CreatePhotoController',
          controllerAs: 'vm'
        }
      }
    });
}
})();
