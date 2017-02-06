var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var userService = require('services/user.service');
var responseService = require('services/response.service');

router.post('/', function (req, res) {
  userService.create(req.body).
      then(function () {
        var response = responseService.response('Created', null);
        res.status(201).send(response);
      }).
      catch(function (err) {
        var response = responseService.response(null, err);        
        res.status(400).send(response);
      });
});

module.exports = router;