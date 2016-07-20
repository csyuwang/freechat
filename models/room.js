var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
  name: String,
  creator: String,
  createDate: Number
});

module.exports = RoomSchema;
