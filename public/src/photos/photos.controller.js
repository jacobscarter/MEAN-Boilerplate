(function() {
'use strict';

var photos = null;
try {
  photos = angular.module('photos');
} catch (err) {
  photos = angular.module('photos', ['ui.router']);
}

photos.controller('PhotosController', PhotosController);

PhotosController.$inject = ['$state', 'galleryService'];

function PhotosController($state, galleryService) {

  var vm_ = this;

  vm_.photos = [];
  vm_.editPhoto = editPhoto_;

  initiate_();

  function initiate_() {
    galleryService.getImages().
        then(function(data) {
          vm_.photos = data.result;
        }).
        catch(function(error) {
          window.alert('There was an error retrieving photos: ', error);
        });
  }

  function editPhoto_(id) {
    $state.go('root.editPhoto', {id: id});
  }
}
})();
