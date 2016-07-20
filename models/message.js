var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var MessageSchema = new mongoose.Schema({
  content: String,
  creator: String,
  createAt: ObjectId,
  createDate: Number
});

module.exports = MessageSchema;
