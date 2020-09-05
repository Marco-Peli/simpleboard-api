let config = {};
let io = {};
let port = 0;

exports.initSocketIOvars = function() {
  config = require('./config_handler').mainConfig;
  port = config.SOCKET_IO_PORT;
  io = require('socket.io')(port);
}

exports.registerSocketEvents = () => {
  console.log(config.SOCKET_IO_HANDLER_MODULE_PREFIX, 'socket.io handler started, listening to port', port);

  io.on('connection', (socket) => {
    console.log('socket connected: ', + socket);
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

    socket.on('drawBuf', (msg) => {
      console.log('DRAWING BUFFER: ' + msg);
      socket.broadcast.emit('drawBuf', msg);
    });
  });
}
