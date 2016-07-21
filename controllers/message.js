var db = require('../models');

exports.findByRoom = function(_createAt, _limit, callback) {
  db.Message.find({
    createAt: _createAt
  }).sort({
    createDate: -1
  }).limit(_limit).exec(callback);
}

exports.create = function(_content, _creator, _createAt, callback) {
  var message = new db.Message({
    content: _content,
    creator: _creator,
    createAt: _createAt,
    createDate: +new Date()
  });
  message.save(callback);
}
