
const {expect} = require('chai')
const db = require('../index')
const Order = db.model('Order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  });

    describe('correct Status', () => {
      let newOrder;

      beforeEach(() => {
        return Order.create({
          status: 'Processing',
        })
          .then(order => {
            newOrder = order;
          })
      })

      it('returns true if the password is correct', () => {
        expect(newOrder.status).to.be.equal('Processing')
      });
    }); // end describe('correct Status')
}); // end describe('Order model')
