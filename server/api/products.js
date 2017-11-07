const router = require('express').Router();
const { Product, Order, Review } = require('../db/models');
module.exports = router;

// GET /api/products
router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{ model: Order, as: 'order'}]
  })
    .then(product => res.json(product))
    .catch(next);
});

// GET /api/products/tags
router.get('/tags', (req, res, next) => {
  Product.findSimilarByTag(req.query.tag)
    .then(products => res.json(products))
    .catch(next);
});

// GET /api/products/:productId
router.get('/:productId', (req, res, next) => {
  Product.findById(+req.params.productId, { include: { model: Review } })
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
