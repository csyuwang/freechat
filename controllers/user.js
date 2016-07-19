var db = require('../models');

exports.findByName = function(_username, callback) {
  db.User.findOne({
    name: _username
  }, callback);
}

exports.findById = function(_userId, callback) {
  db.User.findOne({
    _id: _userId
  }, callback);
}

exports.exist = function(_username, _password, callback) {
  db.User.findOne({
    name: _username,
    password: _password
  }, callback);
}

exports.create = function(_username, _password, callback) {
  var user = new db.User({
    name: _username,
    password: _password
  });
  user.save(callback);
}
