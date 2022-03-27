const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Access-Control-Allow-Origin'],
    credentials: true,
  },
});
const sio = require('socket.io-client')('https://asl-api.herokuapp.com/');

const PORT = process.env.PORT || 3001;
const path = require('path');

let socketList = {};
let currUser = undefined;
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Socket
io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    delete socketList[socket.id];
    socket.disconnect();
    console.log('User disconnected!');
  });

  /**
   * Join Room
   */
  socket.on('BE-join-room', ({ roomId, user }) => {
    // Socket Join RoomName
    // if (currUser) {
    //   socket.emit('FE-duplicate-user');
    //   return;
    // }
    socket.join(roomId);
    currUser = user;
    socketList[socket.id] = { user, video: true, audio: true };

    // Set User List
    socket.to(roomId).emit('FE-user-join', {
      userId: socket.id,
      info: socketList[socket.id],
    });

    sio.on('stream_text', ({ data, id }) => {
      console.log('received data from hassib');
      io.in(roomId).emit('receive-frame', { frame: arrayBufferToBase64(data) });
    });
    // io.sockets.in(roomId).emit('FE-user-join', users);
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-send-message', ({ roomId, msg, sender }) => {
    io.in(roomId).emit('FE-receive-message', { msg, sender });
  });

  socket.on('BE-leave-room', ({ roomId }) => {
    delete socketList[socket.id];
    socket.to(roomId).emit('FE-user-leave', { userId: socket.id });
    socket.leave(roomId);
  });

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });

  socket.on('send-text', ({ data, roomId }) => {
    console.log('received data from frontend');

    console.log({ data });
    sio.emit('stream_text', { data, id: sio.id });
    io.in(roomId).emit('receive-text', { data });
  });
  sio.on('send', () => {
    console.log('finished sending 1');
    socket.emit('send');
  });
});

const arrayBufferToBase64 = (buffer) => {
  return buffer.toString('base64');
};

http.listen(PORT, () => {
  console.log(PORT);
});
