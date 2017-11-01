const { expect } = require('chai');
const db = require('../index');
const LineItem = require('./lineItem');

describe('lineItem model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('correct values', () => {
    let newLineItem;

    beforeEach(() => {
      return LineItem.create({
        purchasePrice: 34.99
      }).then(lineItem => {
        newLineItem = lineItem;
      });
    });

    it('returns true if new item price equals original purchase price', () => {
      expect(newLineItem.purchasePrice).to.be.equal('34.99');
    });

    it('returns true if the purchaseNum is a number', () => {
      expect(newLineItem.purchaseNum).to.be.a('number');
    });

    it('returns true if the purchaseNum is the default value', () => {
      expect(newLineItem.purchaseNum).to.equal(1);
    });
  }); // end describe('correctPassword')
}); // end describe('LineItem model')
