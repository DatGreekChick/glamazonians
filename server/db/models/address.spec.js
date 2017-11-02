const { expect } = require('chai');
const db = require('../index');
const Address = require('./address');

describe('Address model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('address has required properties', () => {
    let work;

    beforeEach(() => {
      return Address.create({
        line1: '5 Hanover Square',
        line2: 'Floor 25',
        city: 'New York',
        state: 'NY',
        zip: '10005'
      }).then(address => (work = address));
    });

    it('line1, city, state, and zip cannot be null', () => {
      expect(work.line1).to.not.be.null;
      expect(work.city).to.not.be.null;
      expect(work.state).to.not.be.null;
      expect(work.zip).to.not.be.null;
    });
  });
});
