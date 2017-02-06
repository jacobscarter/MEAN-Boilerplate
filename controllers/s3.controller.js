var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var userService = require('services/user.service');
var aws = require('aws-sdk');
var S3_BUCKET = process.env.S3_BUCKET;
var responseService = require('services/response.service');

router.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  var s3Key = 'tagged-images/' + fileName;
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: s3Key,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://s3.amazonaws.com/${S3_BUCKET}/tagged-images/${fileName}`
    };
    var response = responseService.response(returnData, null);
    res.write(JSON.stringify(response));
    res.end();
  });
});

module.exports = router;