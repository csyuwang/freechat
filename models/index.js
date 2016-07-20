var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

exports.User = mongoose.model('User', require('./user'));
exports.Room = mongoose.model('Room', require('./room'));
exports.Message = mongoose.model('Message', require('./message'));
