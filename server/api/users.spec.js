/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const agent = request.agent(app);
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        email: codysEmail
      });
    });

    xit('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(codysEmail);
        });
    });
  }); // end describe('/api/users')

  describe('/api/users/:userId', () => {
    let user;

    beforeEach(function() {
      var creatingUsers = [
        {
          name: 'Eleni',
          email: 'eleni@eleni.com'
        },
        {
          name: 'Keri',
          email: 'keri@keri.com'
        },
        {
          name: 'Shelby',
          email: 'shelby@shelby.com'
        }
      ].map(data => User.create(data));

      return Promise.all(creatingUsers).then(createdUser => {
        user = createdUser[2];
      });
    });

    xit('returns the JSON of the user based on the id', function() {
      return agent
        .get('/api/users/' + user.id)
        .expect(200)
        .expect(res => {
          if (typeof res.body === 'string') {
            res.body = JSON.parse(res.body);
          }
          expect(res.body.email).to.equal('shelby@shelby.com');
          expect(res.body.name).to.equal('Shelby');
        });
    });
    xit('returns a 404 error if the ID is not correct', function() {
      return agent.get('/api/users/12').expect(404);
    });
  });
});
