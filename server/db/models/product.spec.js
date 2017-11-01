const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model)', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Product model attributes', () => {
    let costume;
    beforeEach(() => {
      return Product.create({
        name: 'sexy cat',
        image: 'http://placecage.com/400/400',
        price: 69.69,
        quantityAvailable: 15,
        description: 'Not your typical sexy cat costume',
        tags: ['cat', 'meow', 'sexy']
      }).then(product => (costume = product));
    });

    it('returns the quantity available', () => {
      expect(costume.quantityAvailable).to.equal(15);
    });

    it('returns accurate tag', () => {
      expect(costume.tags[0]).to.equal('cat');
    });

    it('returns number of tags', () => {
      expect(costume.tags.length).to.equal(3);
    });
  });
});
