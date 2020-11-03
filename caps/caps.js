const io = require('socket.io')(3030);

const caps = io.of('/caps');

caps.on('connection', (socket) => {
  console.log('Welcome to the caps Server!', socket.id);

  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    caps.emit('pickup', payload);
    log('pickup', payload);
  });
  socket.on('in-transit', (payload) => {
    log('in-transit', payload);
  });
  socket.on('delivered', (payload) => {
    caps.to(payload.storeName).emit('delivered', payload);
    log('delivered', payload);
  });
});

function log(event, payload) {
  console.log('EVENT', { event, time: new Date(), payload });
}
