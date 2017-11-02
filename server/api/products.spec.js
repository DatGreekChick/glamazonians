/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  // name, description, price, quantityAvailable
  describe('/api/products/', () => {
    let costumeName = 'Happy Lady Does Gardening';
    let costumeDescription =
      'A velcro and spandex costume with blue boots and a yellow cape';
    let costumePrice = '10.00';
    let costumeQuantity = 30;
    let costumeTags = 'superhero, marvel, action';
    let randomTag = 'marvel';
    let costumeId;
    beforeEach(() => {
      return Product.create({
        name: costumeName,
        description: costumeDescription,
        price: costumePrice,
        quantityAvailable: costumeQuantity,
        tags: costumeTags
      }).then(createdProduct => {
        costumeId = createdProduct.id;
      });
    });

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(costumeName);
          expect(res.body[0].description).to.be.equal(costumeDescription);
          expect(res.body[0].priceInDollars).to.be.equal(costumePrice);
          expect(res.body[0].quantityAvailable).to.be.equal(costumeQuantity);
          expect(res.body[0].tags).to.have.lengthOf(3);
        });
    });

    it('GET /api/products/:productId', () => {
      return request(app)
        .get(`/api/products/${costumeId}`)
        .expect(200)
        .then(res => {
          expect(res.body.name).to.be.equal(costumeName);
          expect(res.body.description).to.be.equal(costumeDescription);
          expect(res.body.priceInDollars).to.be.equal(costumePrice);
          expect(res.body.quantityAvailable).to.be.equal(costumeQuantity);
          expect(res.body.tags).to.have.lengthOf(3);
          expect(res.body.id).to.be.equal(costumeId);
        });
    });

    it('POST /api/products/', () => {
      return request(app)
        .post('/api/products')
        .send({
          name: 'Mad Big Head in Hot Pants',
          price: 45.0,
          description: 'Red and black ruffle skirt and blouse',
          quantityAvailable: 69
        })
        .expect(201)
        .then(res => {
          const newProduct = res.body;
          return Product.findById(newProduct.id);
        })
        .then(foundProduct => {
          expect(foundProduct.name).to.be.equal('Mad Big Head in Hot Pants');
        });
    });

    it('PUT /api/products/:productId', () => {
      return request(app)
        .put('/api/products/' + costumeId)
        .send({
          name: 'Angry Juggle Woman'
        })
        .expect(202)
        .expect(function(res) {
          console.log(res.body);
          expect(res.body.name).to.be.equal('Angry Juggle Woman');
        });
    });

    it('GET /api/products/:tag', () => {
      return request(app)
        .get(`/api/products/${randomTag}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(1);
          expect(res.body[0].description).to.be.equal(costumeDescription);
        });
    });

    it('GET /api/products/popular', () => {
      return request(app)
        .get('/api/products/popular')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
        });
    });
  }); // end describe('product routes')
}); // end describe('product routes')
