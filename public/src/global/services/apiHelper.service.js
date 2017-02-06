(function() {

var app = null;
try {
  app = angular.module('app');
} catch (err) {
  app = angular.module('app', ['ui.router']);
}

app.service('apiHelperService', apiHelperService);

apiHelperService.$inject = ['$http', '$q'];

function apiHelperService($http, $q) {

  var service_ = this;

  var endpoints_ = {
    'login': '/api/login',
    'register': '/api/register',
    's3SignRequest': '/api/s3/sign-s3'
    //'photos': '/api/galleries',
    //'photo': '/api/galleries/:id'
  };

  service_.endpoints = endpoints_;
  service_.fillUrl = fillUrl_;
  service_.getCall = getCall_;
  service_.postCall = postCall_;
  service_.putCall = putCall_;
  service_.deleteCall = deleteCall_;

  /**
   * Builds URL for making HTTP request.
   *
   * @param {string} urlFormat The endpoint your want to hit from endpoints_ object.
   * @param {Object} [pathParams] The data used to populate dynamic URLs.
   * @param {Object} [queryParams] The data used to populate dynamic query params.
   * @return {string} Newly generated and interpolated URL string.
   */
  function fillUrl_(urlFormat, pathParams, queryParams) {
    var url = urlFormat;
    angular.forEach(pathParams, function(val, name) {
      if (typeof(val) === 'undefined' || val === null || val === '') {
        url = url.replace(new RegExp('/:' + name, 'g'), '');
      } else {
        url = url.replace(new RegExp(':' + name, 'g'), val);
      }

    });
    if (Object.keys(queryParams).length > 0) {
      var formattedQueryParams = [];
      angular.forEach(queryParams, function(val, key) {
        //TODO format values (i.e.: arrays)
        formattedQueryParams.push('' + key + '=' + val);
      });
      url += '?' + formattedQueryParams.join('&');
    }
    return url;
  }

  /**
   * Sends out a HTTP GET call.
   *
   * @param {string} endpoint The endpoint your want to hit from apihelper.
   * @param {Object} [fillUrl] The data used to populate dynamic URLs.
   * @param {Object} [queryParams] The data used to populate dynamic query params.
   * @return {angular.Promise} A promise to be resolved whenever a remote call is completed.
   */
  function getCall_(endpoint, fillUrl, queryParams) {
    var context = fillUrl || {};
    var params = queryParams || {};
    var d = $q.defer();
    $http.get(fillUrl_(service_.endpoints[endpoint], context, params)).then(
        function(response) {
          return d.resolve(response.data, response.status, response.header);
        },
        function(response) {
          return d.reject(response.error);
        });
    return d.promise;
  }

  /**
   * Sends out a HTTP POST call.
   *
   * @param {string} endpoint The endpoint your want to hit from apihelper.
   * @param {Object} [payload] The data being sent via POST.
   * @param {Object} [fillUrl] The data used to populate dynamic URLs.
   * @param {Object} [queryParams] The data used to populate dynamic query params.
   * @param {httpSuccessCallback} [successCallback] The callback to be triggered on success.
   * @param {httpErrorCallback} [errorCallback] The callback to be triggered on error.
   * @return {angular.Promise} A promise to be resolved whenever a remote call is completed.
   */
  function postCall_(endpoint, payload, fillUrl, queryParams, successCallback, errorCallback) {
    var context = fillUrl || {};
    var params = queryParams || {};
    var d = $q.defer();
    $http.post(fillUrl_(service_.endpoints[endpoint], context, params), payload).then(
        function(response) {
          if (angular.isFunction(successCallback)) {
            successCallback(response.data, response.status, response.header);
          }
          return d.resolve(response.data, response.status, response.header);
        },
        function(response) {
          if (angular.isFunction(errorCallback)) {
            errorCallback(response);
          }
          return d.reject(response.error);
        });
    return d.promise;
  }

  /**
   * Sends out a HTTP PUT call.
   *
   * @param {string} endpoint The endpoint your want to hit from apihelper.
   * @param {Object} [payload] The data being sent via PUT.
   * @param {Object} [fillUrl] The data used to populate dynamic URLs.
   * @param {Object} [queryParams] The data used to populate dynamic query params.
   * @param {httpSuccessCallback} [successCallback] The callback to be triggered on success.
   * @param {httpErrorCallback} [errorCallback] The callback to be triggered on error.
   * @return {angular.Promise} A promise to be resolved whenever a remote call is completed.
   */
  function putCall_(endpoint, payload, fillUrl, queryParams, successCallback, errorCallback) {
    var context = fillUrl || {};
    payload = payload || {};
    var params = queryParams || {};
    var d = $q.defer();
    $http.put(fillUrl_(service_.endpoints[endpoint], context, params), payload).then(
        function(response) {
          if (angular.isFunction(successCallback)) {
            successCallback(response.data, response.status, response.header);
          }
          return d.resolve(response.data, response.status, response.header);
        },
        function(response) {
          if (angular.isFunction(errorCallback)) {
            errorCallback(response);
          }
          return d.reject(response.error);
        });
    return d.promise;
  }

  /**
   * Sends out a HTTP DELETE call.
   *
   * @param {string} endpoint The endpoint your want to hit from apihelper.
   * @param {Object} [fillUrl] The data used to populate dynamic URLs.
   * @param {Object} [queryParams] The data used to populate dynamic query params.
   * @param {Object} [payload] The data being sent via DELETE.
   * @return {angular.Promise} A promise to be resolved whenever a remote call is completed.
   */
  function deleteCall_(endpoint, fillUrl, queryParams, payload) {
    var context = fillUrl || {};
    var params = queryParams || {};
    payload = payload || {};
    var d = $q.defer();
    $http.delete(fillUrl_(service_.endpoints[endpoint], context, params), payload).then(
        function(response) {
          return d.resolve(response.data, response.status, response.header);
        },
        function(response) {
          return d.reject(response.error);
        });
    return d.promise;
  }
}
})();
