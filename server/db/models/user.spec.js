/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const Member = db.model('member');

describe('Member model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(() => {
        return Member.create({
          name: 'cody',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => cody = user)
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      });
    })
  });

  describe('member has other required properties', () => {
    let cody;

    beforeEach(() => {
      return Member.create({
        name: 'cody',
        email: 'cody@puppybook.com',
        password: 'bones'
      })
        .then(user => cody = user)
    });

    it('has a name', () => {
      expect(cody).to.have.property('name', cody.name);
    });

    it('has an email', () => {
      expect(cody).to.have.property('email', cody.email);
    });

    it('has an address', () => {
      expect(cody).to.have.property('address', cody.address);
    });
  })
});
