const router = require('express').Router();
const { LineItem } = require('../db/models');
module.exports = router;


// POST /api/items
router.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineItem => res.status(201).json(lineItem))
    .catch(next);
});
