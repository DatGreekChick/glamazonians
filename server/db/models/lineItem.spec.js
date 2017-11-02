const { expect } = require('chai');
const db = require('../index');
const LineItem = require('./lineItem');

describe('lineItem model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('purchasePrice and purchaseNum field', () => {
    let newLineItem;

    beforeEach(() => {
      return LineItem.create({
        // the purchasePrice val should be coming from the Product.price val
          //which is in pennies
        purchasePrice: 3490 //34.90
      }).then(lineItem => {
        newLineItem = lineItem;
      });
    });

    // Store, add getter/setter for the field to convert from decimal to integer and back
    it('purchasePrice should never be null', () => {
      const itemWithoutPrice = LineItem.build({ purchaseNum: 1 });

      return itemWithoutPrice
        .save()
        .then(() => {
          throw new Error('Promise should have rejected');
        })
        .catch(err => {
          expect(err).to.exist;
        });
    });

    it('stores the Product.price in pennies',  () => {
      expect(newLineItem.purchasePrice).to.be.equal(3490);
    });

    it('purchaseNum is 1 by default', () => {
      expect(newLineItem.purchaseNum).to.equal(1);
    });
  }); // end describe('correctPassword')
}); // end describe('LineItem model')
