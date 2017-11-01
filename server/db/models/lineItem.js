const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  purchasePrice: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  purchaseNum: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = LineItem;
