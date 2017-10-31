/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model (not anonymous!)', () => {
  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(() => {
        return User.create({
          name: 'cody',
          email: 'cody@puppybook.com',
          password: 'bones',
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

  describe('user has other required properties', () => {
    let cody;

    beforeEach(() => {
      return User.create({
        name: 'cody',
        email: 'cody@puppybook.com',
        password: 'bones',
        address: '1 Puppy Way, Puppyville, NY 10003'
      })
        .then(user => cody = user)
    });

    it('has a name', () => {
      expect(cody).to.have.property('name', cody.name);
    });

    it('has an email', () => {
      expect(cody).to.have.property('email', cody.email);
    });
  })
});
