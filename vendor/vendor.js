'use strict';
const net = require('net');
const client = new net.Socket();
const faker = require('faker');
require('dotenv').config();

const storeName = process.env.STORE_NAME;
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

client.connect(PORT, HOST, () => {
  console.log('Vendor connected');
});

setInterval(function () {
  let obj = {
    storeName,
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  let message = JSON.stringify({ event: 'pickup', payload: obj });
  client.write(message);
}, 5000);

client.on('data', (bufferData) => {
  const dataObj = JSON.parse(bufferData);
  if (dataObj.event === 'delivered') {
    console.log(`VENDOR: Thank you for delivering ${dataObj.payload.orderId}`);
  }
});

client.on('close', () => {
  console.log(`Server Closed`);
});
