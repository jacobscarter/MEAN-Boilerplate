var Q = require('q');
var mongoose = require('mongoose');
var db = mongoose.connection;
var Galleries = require('schemas/galleries.schema');
var ObjectId = require('mongoose').Types.ObjectId; 

var service = {};

service.create = create;
service.getPhotos = getPhotos;
service.getPhoto = getPhoto;
service.updatePhoto = updatePhoto;

module.exports = service;

/**
 * Create a new gallery item  and insert the document into the galleries collection.
 * 
 * @param {Object} galleryObject Object containing gallery information.
 */
function create(galleryObject) {
  var deferred = Q.defer();
  var gallery = new Galleries(galleryObject);
  gallery.save(function (err, data) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve(data);
  });
  return deferred.promise;
}

/**
 * Get all galleries in the collection.
 * 
 */
function getPhotos() {
  var deferred = Q.defer();
  Galleries.find(function (err, photos) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve(photos);
  });
  return deferred.promise;
}

/**
 * Get a single photo.
 * 
 * @param {string} id ID of the photo you are retrieving.
 */
function getPhoto(id) {
  var deferred = Q.defer();
  Galleries.findById(id, function (err, photo) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    } else {
      deferred.resolve(photo);
    }
  });
  return deferred.promise;
}

/**
 * Update a single photo.
 * 
 * @param {Object} data Data that we are updating.
 * @param {string} id ID of the photo you are updating
 */
function updatePhoto(data, id) {
  var deferred = Q.defer();
  Galleries.findById(id, function (err, photo) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    } else {
      photo.name = data.name;
      photo.tags = data.tags;
      photo.save(function(err, updatedPhoto) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        } else {
          deferred.resolve(photo);
        }
      });
    }
  });
  return deferred.promise;
}
