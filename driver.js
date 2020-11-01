const events = require('./events');

events.on('pickup', (payload) => {
  setTimeout(function () {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit', payload);
  }, 1000);

  setTimeout(function () {
    console.log('delivered');
    events.emit('delivered', payload);
  }, 3000);
});
