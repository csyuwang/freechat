var db = require('../models');

exports.findAll = function(callback) {
  db.Room.find().sort({
    createDate: -1
  }).exec(callback);
}

exports.findByName = function(_name, callback) {
  db.Room.findOne({
    name: _name
  }, callback);
}

exports.create = function(_name, _creator, callback) {
  var room = new db.Room({
    name: _name,
    creator: _creator,
    createDate: +new Date()
  });
  room.save(callback);
}
