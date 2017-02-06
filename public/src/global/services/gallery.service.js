(function() {
'use strict';

var app = null;
try {
  app = angular.module('app');
} catch (err) {
  app = angular.module('app', ['ui.router']);
}

app.service('galleryService', galleryService);

galleryService.$inject = ['apiHelperService'];

function galleryService(apiHelperService) {

  /* jshint validthis: true */
  var service_ = this;
  /* jshint validthis: false */

  service_.saveImage = saveImage_;
  service_.getImages = getImages_;
  service_.getImage = getImage_;

  /**
   * Create a new tagged image.
   *
   * @param {Object} data Gallery object with image and tags.
   */
  function saveImage_(data) {
    return apiHelperService.postCall('photos', data);
  }

  /**
   * Get all tagged images.
   *
   */
  function getImages_() {
    return apiHelperService.getCall('photos');
  }

  /**
   * Get single photo.
   *
   * @param {string} id ID of the photo you are retrieving.
   */
  function getImage_(id) {
    return apiHelperService.getCall('photo', {id: id});
  }
}

})();
