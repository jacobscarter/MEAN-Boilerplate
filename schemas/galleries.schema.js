var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Gallery = new Schema({
  id: {type: ObjectId, index: true},
  name: String,
  image: {
    url: String
  }
});

var Galleries = mongoose.model('Galleries', Gallery);

module.exports = Galleries;