const net = require('net');
const client = new net.Socket();
require('dotenv').config();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

client.connect(PORT, HOST, () => {
  console.log('Driver connected');
});

client.on('data', (bufferData) => {
  const dataObj = JSON.parse(bufferData);
  if (dataObj.event === 'pickup') {
    setTimeout(() => {
      console.log(`Picking up ${dataObj.payload.orderId}`);
      const message = JSON.stringify({
        event: 'in-transit',
        payload: dataObj.payload,
      });
      client.write(message);
    }, 1000);
  } else if (dataObj.event === 'in-transit') {
    setTimeout(() => {
      console.log(`Delivered ${dataObj.payload.orderId}`);
      const message = JSON.stringify({
        event: 'delivered',
        payload: dataObj.payload,
      });
      client.write(message);
    }, 3000);
  }
});

client.on('close', () => {
  console.log(`Server Closed`);
});
