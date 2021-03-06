const {
  expect
} = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model)', () => {
  beforeEach(() => {
    return db.sync({
      force: true
    });
  });

  describe('Product model attributes', () => {
    let costume, costume2;
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

    beforeEach(() => {
      return Product.create({
        name: 'Sexy Cage',
        image: 'http://placecage.com/400/400',
        price: 50.00,
        quantityAvailable: 1,
        description: 'Not your typical sexy Cage costume',
        tags: ['cage', 'meow', 'sexy']
      }).then(product => (costume2 = product));
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
    describe('Product Price logic', () => {
      it('stores the dollar price value in pennies', () => {
        expect(costume.price).to.equal(6969);
      });

      it('converts the price back into dollars', () => {
        expect(costume.priceInDollars).to.equal('69.69');
      });

      it('has two places after the decimal including zero endings', () => {
        expect(costume2.priceInDollars).to.equal('50.00')
      });
    });

    describe('Product instanceMethods', () => {
      it('Product instance method removeTag removes a tag when called', () => {
        costume2.removeTag('meow');
        expect(costume2.tags).to.deep.equal(['cage', 'sexy']);
      });

      it('Product instance method removeTag is NOT case sensitive', () => {
        costume2.removeTag('Meow');
        expect(costume2.tags).to.deep.equal(['cage', 'sexy']);
      });

      it('Product instance method addTag adds a tag when called', () => {
        costume2.addTag('bees');
        expect(costume2.tags).to.deep.equal(['cage', 'meow', 'sexy', 'bees']);
      });

      it('Product instance method addTag adds a tag in lower case', () => {
        costume2.addTag('bEeS');
        expect(costume2.tags).to.deep.equal(['cage', 'meow', 'sexy', 'bees']);
      });

      it('Product instance addTag converts integer tags into strings', () => {
        costume.addTag(666);
        expect(costume.tags).to.deep.equal(['cat', 'meow', 'sexy', '666']);
      });
    });
  });
});
