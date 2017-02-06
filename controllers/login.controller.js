var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var userService = require('services/user.service');
var responseService = require('services/response.service');

//Login User
router.post('/', authenticateUser);

function authenticateUser(req, res) {
  var username = req.body.username.toLowerCase();
  userService.authenticate(username, req.body.password).
      then(function (data) {
        if (data) {
          // authentication successful
          var response = responseService.response({ token: data.token, user: data.user }, null);
          res.send(response);
        } else {
          // authentication failed
          var response = responseService.response(null, 'Username or password is incorrect');
          res.status(401).send(response);
        }
      }).
      catch(function (err) {
        var response = responseService.response(null, err);
        res.status(400).send(response);
      });
}

module.exports = router;