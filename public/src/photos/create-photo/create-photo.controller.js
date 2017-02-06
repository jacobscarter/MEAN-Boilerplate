(function() {
'use strict';

var photos = null;
try {
  photos = angular.module('photos');
} catch (err) {
  photos = angular.module('photos', ['ui.router']);
}

photos.controller('CreatePhotoController', CreatePhotoController);

CreatePhotoController.$inject = ['$mdDialog', '$state', '$scope', '$compile', 'FileUploader', 'uploaderService',
    'galleryService'];

function CreatePhotoController($mdDialog, $state, $scope, $compile, FileUploader, uploaderService, galleryService) {

  var vm_ = this;

  vm_.fileUrl = null;
  vm_.photoName = '';
  vm_.saveImage = saveImage_;
  vm_.triggerUploadLink = triggerUploadLink_ ;

  var uploader = vm_.uploader = new FileUploader({
    url: ''
  });

  function saveImage_() {
    var taggedImageObject = {
      image: {
        url: vm_.fileUrl
      },
      name: vm_.photoName
    };
    galleryService.saveImage(taggedImageObject).
        then(function() {
          $state.go('root.photos');
        }).
        catch(function(error) {
          window.alert('There was an error saving your tagged image, please try again. ' + JSON.stringify(error));
        });
  }

  function triggerUploadLink_(e) {
    e.preventDefault();
    jQuery('#file-uploader').trigger('click');
  }

  // CALLBACKS
  uploader.onAfterAddingFile = function(fileItem) {
    uploaderService.getSignedRequest(fileItem.file).
        then(function(data) {
          function uploadFile(file, signedRequest, url) {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', signedRequest);
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  vm_.fileUrl = url;
                  $scope.$apply();
                } else {
                  alert('Could not upload file.');
                }
              }
            };
            xhr.send(file);
          }
          uploadFile(fileItem._file, data.result.signedRequest, data.result.url);
        });
  };
}
})();
