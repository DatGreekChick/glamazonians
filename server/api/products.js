const router = require('express').Router();
const { Product, Order } = require('../db/models');
module.exports = router;

// GET /api/products
router.get('/', (req, res, next) => {
  Product.findAll({})
    .then(product => res.json(product))
    .catch(next);
});

// GET /api/products/:productId
router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next);
});

// POST /api/products
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next);
});

// PUT /api/products
router.put('/:productId', (req, res, next) => {
  Product.findById(+req.params.productId)
    .then(product => product.update(req.body))
    .then(res.sendStatus(202))
    .catch(next);
});

// DELETE /api/products/:productId
router.delete('/:productId', (req, res, next) => {
  Product.destroy({
    where: { id: +req.params.productId }
  })
    .then(() => res.status(204).end())
    .catch(next);
});

// GET /api/products
router.get('/:tag', (req, res, next) => {
  Product.findSimilarByTag(req.params.tag)
    .then(products => res.json(products))
    .catch(next);
});

// TODO: write Order model method
router.get('/popular', (req, res, next) => {
  Order.getPopularProducts({})
    .then(products => res.json(products))
    .catch(next);
});
