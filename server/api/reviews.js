const router = require('express').Router();
const { User, Product, Order, Review } = require('../db/models');

module.exports = router;


// POST /api/reviews
router.post('/', (req, res, next) => {
  console.log('body', req.body);
  Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next);
});
