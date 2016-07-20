var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var React = require('react');
var Router = require('react-router');
var swig = require('swig');
// React routes
var routes = require('./app/routes');
// node server routes
var router = require('./routes');
var controllers = require('./controllers');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use(function(req, res) {
  Router.run(routes, req.path, function(App) {
    var html = React.renderToString(React.createElement(App));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});

var server = require('http').Server(app);
var io = require('socket.io')(server);
var onlineUsers = 0;
var roomUsers = {};
var users = {};

io.on('connection', function(socket){
  var userId = null;
  var username = null;
  var roomId = null;
  onlineUsers++;

  io.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('join', function(join) {
    userId = join.userId;
    if(!users[userId]) {
      users[userId] = {
        name: join.username
      };
    }
    username = users[userId].name;
    roomId = join.roomId;

    if(!roomUsers[roomId]) {
      roomUsers[roomId] = [];
    }
    roomUsers[roomId].push(userId);
    socket.join(roomId);
    io.to(roomId).emit('new message', {'content': username + ' 进入了房间', 'creator': 'System'});
  })

  socket.on('message', function(msg) {
    controllers.Message.create(msg.content, username, roomId, function (err, message) {
      if(!err) {
        io.to(roomId).emit('new message', message);
      }
    });
  })

  socket.on('disconnect', function(){
    onlineUsers--;
    io.emit('onlineUsers', { onlineUsers: onlineUsers });
    if(roomId) {
      socket.leave(roomId, function (err){
        if (err) {
          log.error(err);
        } else {
          var index = roomUsers[roomId].indexOf(userId);
          if (index !== -1) {
            roomUsers[roomId].splice(index, 1);
            socket.broadcast.to(roomId).emit('new message', {'content': username + ' 离开了房间', 'username': 'System'});
          }
        }
      });
    }
  });

  socket.on('leave', function(){
    socket.leave(roomId, function (err){
      if (err) {
        log.error(err);
      } else {
        var index = roomUsers[roomId].indexOf(userId);
        if (index !== -1) {
          roomUsers[roomId].splice(index, 1);
          socket.broadcast.to(roomId).emit('new message', {'content': username + ' 离开了房间'});
        }
      }
    });
  });

});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
