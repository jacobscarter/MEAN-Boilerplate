var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = new Schema({
    id : ObjectId,
    firstName : String,
    lastName : String,
    username : String,
    email : String,
    hash : String,
    claims: [String]
});

var Users = mongoose.model('Users', User);

module.exports = Users;