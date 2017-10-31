const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router


// GET /api/orders
router.get('/', (req, res, next) => {
  Order.findAll({})
    .then(orders => res.json(orders))
    .catch(next)
})

// GET /api/orders/:status
router.get('/:status', (req, res, next) => {
  Order.findAll({
    where: {
      status: req.params.status
    }
  })
    .then(orders => res.json(orders))
    .catch(next)
});

// GET /api/orders/:orderId
router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next)
});

// PUT /api/orders/:orderId
router.put('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
  .then(order => order.update(req.body))
    .then(newOrder => res.status(201).json(newOrder))
    .catch(next)
});
