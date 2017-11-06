const router = require('express').Router()
const {User, Order, Address} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    include: [{ model: Address, as: 'addresses' }]
    }, {
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

//view a list of their previous orders
// EI: instead of doing this, you could also make a GET request to /api/orders?userId=...
router.get('/:userId/orders', (req, res, next) => {
  const userId = +req.params.userId;
  Order.findAll({
    where: {
      userId
    }
  })
  .then(orders => {
    res.json(orders)
  })
  .catch(next);
});

//admin can get, update, and delete user when accessing users/:userId?
router.get('/:userId', (req, res, next) => {
  User.findById(+req.params.userId)
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(next);
});

router.put('/:userId', (req, res, next) => {
  User.findById(+req.params.userId)
  .then(user => user.update(req.body))
  .catch(next);

});

router.delete('/:userId', (req, res, next) => {
  User.destroy({ where: { id: +req.params.userId }})
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
});
