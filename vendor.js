const events = require('./events');
const faker = require('faker');
require('dotenv').config();

const storeName = process.env.STORE_NAME;

setInterval(function () {
  let obj = {
    storeName,
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  events.emit('pickup', obj);
}, 5000);

events.on('delivered', (payload) => {
  console.log(`Thank you for delivering ${payload.orderId}`);
});
