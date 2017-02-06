var service = {};

service.response = response;

module.exports = service;

/**
 * Authenticate a user using their username and password.
 * 
 * @param {Object} responseBody Object that is being inserted into result.
 */
function response(responseBody, errorBody) {
  var newResponse = {};
  newResponse.result = responseBody || [];
  newResponse.errors = errorBody || [];
  return newResponse;
}