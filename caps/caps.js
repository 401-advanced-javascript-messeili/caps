/* eslint-disable indent */
const net = require('net');
const uuidv4 = require('uuid').v4;
const PORT = process.env.PORT || 4000;

const server = net.createServer();
server.listen(PORT, () => console.log(`sever is running on port ${PORT}`));

const socketPool = {};
//connection is a built in event that will be triggered when a client.connect() is implemented
// 1 a
server.on('connection', (socket) => {
  console.log('Socket Connected!');
  const id = `socket-${uuidv4()}`;
  socketPool[id] = socket;
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('error', (e) => log('SOCKET ERROR', e.message));
  socket.on('end', (id) => delete socketPool[id]);
});
server.on('error', (e) => log('SERVER ERROR', e.message));

//broadcast function
function broadcast(message) {
  const payload = JSON.stringify(message);
  for (let socket in socketPool) {
    socketPool[socket].write(payload);
  }
}
//dispatchEvent function
function dispatchEvent(buffer) {
  const message = JSON.parse(buffer.toString().trim());
  broadcast(message);

  switch (message.event) {
    case 'pickup':
      log('pickup', message);
      break;
    case 'in-transit':
      log('in-transit', message);
      break;

    case 'delivered':
      log('delivered', message);
      break;

    default:
      break;
  }
}

function log(event, payload) {
  console.log('EVENT', { event, time: new Date(), payload });
}

server.on('close', () => {
  console.log(`Server Closed`);
});
