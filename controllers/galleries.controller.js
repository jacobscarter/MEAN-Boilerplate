var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var galleryService = require('services/gallery.service');
var responseService = require('services/response.service');

router.post('/', function (req, res) {
  galleryService.create(req.body).
      then(function (data) {
        var response = responseService.response(data, null);
        res.status(201).send(response);
      }).
      catch(function (err) {
        var response = responseService.response(null, err);        
        res.status(400).send(response);
      });
});

router.get('/', function (req, res) {
  galleryService.getPhotos(req.body).
      then(function (data) {
        var response = responseService.response(data, null);                
        res.status(200).send(response);
      }).
      catch(function (err) {
        var response = responseService.response(null, err);                        
        res.status(400).send(response);
      });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  galleryService.getPhoto(id).
      then(function (data) {
        var response = responseService.response(data, null);                
        res.status(200).send(response);
      }).
      catch(function (err) {
        var response = responseService.response(null, err);                        
        res.status(400).send(response);
      });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  galleryService.updatePhoto(req.body, id).
      then(function (data) {
        var response = responseService.response(data, null);                
        res.status(200).send(response);
      }).
      catch(function (err) {
        var response = responseService.response(null, err);                        
        res.status(400).send(response);
      });
});

module.exports = router;