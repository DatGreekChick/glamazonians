const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['Created', 'Processing', 'Cancelled', 'Completed']
  }
})

module.exports = Order;
