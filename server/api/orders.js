const router = require('express').Router();
const { Order, Address, User } = require('../db/models');
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

// POST /api/orders/create
router.post('/create', (req, res, next) => {
  console.log(req.session);
  Order.create(req.body)
    .then(order => res.status(201).json(order))
    .catch(next);
});

// PUT /api/orders/:orderId
router.put('/:orderId', (req, res, next) => {
  const { name, email, line1, city, state, zipcode } = req.body;
  return Order.findById(req.params.orderId)
    .then(order => {
      if (order.userId === 0) {
        return User.create(
          {
            name,
            email,
            addresses: [
              {
                line1,
                city,
                state,
                zipcode
              }
            ]
          },
          { include: [Address] }
        )
          .then(guestUser => {
            return order.addUser(guestUser);
          })
          .then();
      } else {
        return Address.create({
          line1,
          city,
          state,
          zipcode,
          userId: order.userId
        });
      }
    })
    .then(order => order.update(req.body), {
      returning: true,
      plain: true
    })
    .then(newOrder => res.status(201).json(newOrder))
    .catch(next);
});
