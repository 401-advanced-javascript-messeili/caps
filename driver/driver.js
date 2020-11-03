'use strict';
const io = require('socket.io-client');
const caps = io.connect('http://localhost:3030/caps');

caps.on('connect', () => {
  caps.on('pickup', (payload) => {
    setTimeout(function () {
      console.log(`picked up ${payload.orderId}`);
      caps.emit('in-transit', payload);
    }, 1500);

    setTimeout(function () {
      console.log(`delivered up ${payload.orderId}`);
      caps.emit('delivered', payload);
    }, 3000);
  });
});
