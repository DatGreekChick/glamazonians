const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

// GET /api/orders
// example using query string: /api/orders?status=Processing

router.get('/', (req, res, next) => {
  Order.findAll({
    where: req.query
  })
    .then(orders => res.json(orders))
    .catch(next);
});

// GET /api/orders/:orderId
router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next);
});

// PUT /api/orders/:orderId
router.put('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => order.update(req.body), {
      returning: true,
      plain: true
    })
    .then(newOrder => res.status(201).json(newOrder))
    .catch(next);
});
