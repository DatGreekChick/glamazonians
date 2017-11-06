const { expect } = require('chai');
const db = require('../index');
const Review = db.model('review');

describe('Review model)', () => {
  beforeEach(() => {
    return db.sync({
      force: true
    });
  });

  describe('Review Title Hook', () => {
    let review1, review2;
    beforeEach(() => {
      return Review.create({
        title: 'Material was horrible',
        rating: 1,
        description: 'Thought the fabric would be a lot nicer'
      }).then(review => (review1 = review));
    });

    beforeEach(() => {
      return Review.create({
        description: 'Would recommend because it was a decent costume'
      }).then(review => (review2 = review));
    });

    it('adds a title from the description if not specified', () => {
      expect(review2.title).to.equal('Would recomm...');
    });

    it('returns default value for rating if not specified', () => {
      expect(review2.rating).to.equal(3);
    });

    it('returns default value of false if verified purchase is not specified', () => {
      expect(review1.verifiedPurchase).to.equal(false);
    });
  });
});
