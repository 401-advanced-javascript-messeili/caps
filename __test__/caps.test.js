'use strict';
const caps = require('../caps.js');
jest.spyOn(global.console, 'log');
describe('eventsHandlers test', () => {
  it('respond with the correct event name', () => {
    caps.emit('pickup', 'test');
    expect(console.log).toHaveBeenCalled();
  });
  it('respond with the correct event name', () => {
    caps.emit('in-transit', 'test');
    expect(console.log).toHaveBeenCalled();
  });
  it('respond with the correct event name', () => {
    caps.emit('delivered', 'test');
    expect(console.log).toHaveBeenCalled();
  });
});
