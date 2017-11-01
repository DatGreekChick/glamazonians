const { ENUM } = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: ENUM,
    values: ['Created', 'Processing', 'Cancelled', 'Completed']
  }
});

// TODO/nice to have: add getPopularProducts method (go through line items, find product that's most purchased)

module.exports = Order;
