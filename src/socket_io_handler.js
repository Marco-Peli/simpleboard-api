const io = require('socket.io')(3002);

exports.registerSocketEvents = () => {
  console.log("SOCKET-IO:", 'socket.io handler started');

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
