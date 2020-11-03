'use strict';
const faker = require('faker');
require('dotenv').config();
const io = require('socket.io-client');
const caps = io.connect('http://localhost:3030/caps');

const storeName = process.env.STORE_NAME;

caps.on('connect', () => {
  caps.emit('join', storeName);

  setInterval(function () {
    let message = {
      storeName,
      orderId: faker.random.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
    caps.emit('pickup', message);
  }, 5000);

  caps.on('delivered', (payload) => {
    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  });
});
