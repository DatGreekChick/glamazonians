/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('classMethods', () => {
    describe('finds similar tags', () => {
      let sexyKitten

      beforeEach(() => {
        return Product.create({
          name: 'Sexy Kitten',
          image: 'https://placekitten.com/300/600',
          price: '69.69',
          quantityAvilable: 10,
          description: 'Nothing is scarier than overthinking this costume. Infact don\'t worry your pretty face.',
          tags: 'sexist, beastiality'

        })
          .then(product => {
            sexyKitten = product
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
