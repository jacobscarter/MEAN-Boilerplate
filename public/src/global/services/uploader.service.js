(function() {
'use strict';

var app = null;
try {
  app = angular.module('app');
} catch (err) {
  app = angular.module('app', ['ui.router']);
}

app.service('uploaderService', uploaderService);

uploaderService.$inject = ['$q', '$http', 'apiHelperService'];

function uploaderService($q, $http, apiHelperService) {

  /* jshint validthis: true */
  var service_ = this;
  /* jshint validthis: false */

  service_.getSignedRequest = getSignedRequest_;
  service_.uploadFileToS3 = uploadFileToS3_;

  /**
   * Get signed URL for S3 Upload.
   *
   * @param {Object} fileData Name and File Type of the file.
   */
  function getSignedRequest_(fileData) {
    var queryParams = {
      'file-name': fileData.name,
      'file-type': fileData.type
    };
    return apiHelperService.getCall('s3SignRequest', {}, queryParams);
  }

  /**
   * Upload file to S3.
   *
   * @param {string} signedRequest Signed URL to connect to S3.
   * @param {file} file Media file from clients computer.
   */
  function uploadFileToS3_(signedRequest, file) {
    var d = $q.defer();
    $http({
      method: 'PUT',
      url: signedRequest,
      headers: {'Authorization': undefined},
      data: file
    }).
        then(function(response) {
          return d.resolve(response.data, response.status, response.header);
        }).
        catch(function(response) {
          return d.reject(response);
        });
    return d.promise;
  }
}

})();
