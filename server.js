var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var React = require('react');
var Router = require('react-router');
var swig = require('swig');
var routes = require('./app/routes');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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

io.on('connection', function(socket){
  var userId = null;
  var roomId = null;
  onlineUsers++;

  io.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('join', function(join) {
    userId = join.userId;
    roomId = join.roomId;
    if(!roomUsers[roomId]) {
      roomUsers[roomId] = [];
    }
    roomUsers[roomId].push(userId);
    socket.join(roomId);
    io.to(roomId).emit('new message', {'content': userId + ' 进入房间 ' + roomId});
  })

  socket.on('message', function(msg) {
    io.to(roomId).emit('new message', {'content': msg.content, 'userId': userId });
    console.log('roomId:' + roomId);
    console.log('broadcast');
  })

  socket.on('disconnect', function(){
    onlineUsers--;
    io.emit('onlineUsers', { onlineUsers: onlineUsers });
    if(roomId) {
      socket.leave(roomId, function (err){
        if (err) {
          log.error(err);
        } else {
          console.log(roomId);
          var index = roomUsers[roomId].indexOf(userId);
          if (index !== -1) {
            roomUsers[roomId].splice(index, 1);
            socket.broadcast.to(roomId).emit('new message', {'content': userId + ' 离开了房间 ' + roomId});
          }
        }
      });
    }
  });

  socket.on('leave', function(){
    console.log('leave');
    socket.leave(roomId, function (err){
      if (err) {
        log.error(err);
      } else {
        var index = roomUsers[roomId].indexOf(userId);
        if (index !== -1) {
          roomUsers[roomId].splice(index, 1);
          socket.broadcast.to(roomId).emit('new message', {'content': userId + ' 离开了房间 ' + roomId});
        }
      }
    });
  });

});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
