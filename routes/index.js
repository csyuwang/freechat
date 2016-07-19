var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.post('/api/signup', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  controllers.User.findByName(username, function(err, user){
    if(err) {
      return next(err);
    }
    if(user) {
      return res.status(409).send({ message: user.name + ' is already in the database.' });
    }
    controllers.User.create(username, password, function(err, user) {
      if (err) {
        return next(err);
      }
      res.send({
          _id: user._id
      });
    });
  });
});

router.post('/api/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  controllers.User.exist(username, password, function(err, user){
    if(err) {
      return next(err);
    }
    if(user) {
      res.send({
          _id: user._id
      });
    }
    else {
      return res.status(409).send({ message: username + ' does not exist'});
    }
  });
});

router.get('/api/fetchUser', function(req, res, next) {
  var userId = req.query.userId;
  controllers.User.findById(userId, function(err, user){
    if(err) {
      return next(err);
    }
    if(user) {
      res.send({
          name: user.name
      });
    }
    else {
      return res.status(409).send({ message: 'can not find the user info'});
    }
  });
});

module.exports = router;
