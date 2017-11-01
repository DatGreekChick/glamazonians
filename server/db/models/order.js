const { ENUM } = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: ENUM,
    values: ['Created', 'Processing', 'Cancelled', 'Completed']
  }
});

module.exports = Order;
