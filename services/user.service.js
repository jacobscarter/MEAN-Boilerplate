var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongoose = require('mongoose');
var db = mongoose.connection;
var Users = require('schemas/users.schema');

var service = {};

service.authenticate = authenticate;
service.create = create;

module.exports = service;

/**
 * Authenticate a user using their username and password.
 * 
 * @param {string} username Username of the user logging in.
 * @param {string} password Password of the user loggin in.
 */
function authenticate(username, password) {
  var deferred = Q.defer();
  var query = Users.findOne({ username: username });
  query.exec(function (err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (user && bcrypt.compareSync(password, user.hash)) {
      // authentication successful
      deferred.resolve({token: jwt.sign({ sub: user._id, role: user.claims }, config.secret), user: user});
    } else {
      // authentication failed
      deferred.resolve();
    }
  });
  return deferred.promise;
}

/**
 * Register a new user and insert their document into the user collection.
 * 
 * @param {Object} userParam Object containing user information.
 */
function create(userParam) {
  var deferred = Q.defer();
  var username = userParam.username.toLowerCase();
  var query = Users.findOne({ username: userParam.username });
  // validation
  query.exec(function (err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    if (user) {
      // username already exists
      deferred.reject('Username "' + username + '" is already taken');
    } else {
      createUser();
    }
  });

  function createUser() {
    
    // set user object to userParam without the cleartext password
    var user = _.omit(userParam, 'password');
    if (userParam.employer) {
      user.claims = ['employer'];      
    } else {
      user.claims = ['candidate'];      
    }
    user.username = userParam.username.toLowerCase();

    // add hashed password to user object
    user.hash = bcrypt.hashSync(userParam.password, 10);
    var newUser = new Users(user);
    newUser.save(function (err, data) {
      if (err) {
        deferred.reject(err.name + ': ' + err.message);
      }
      deferred.resolve();
    });
  }
  return deferred.promise;
}
