const { expect } = require('chai');
const db = require('../index');
const Order = require('./order');

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Status Property', () => {
    let newOrder;

    beforeEach(() => {
      return Order.create({
        status: 'Processing'
      }).then(order => {
        newOrder = order;
      });
    });

    it('returns the current status of the order', () => {
      expect(newOrder.status).to.be.equal('Processing');
    });
  });
});
