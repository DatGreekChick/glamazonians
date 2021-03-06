const { DECIMAL, INTEGER } = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
  purchasePrice: {
    type: INTEGER,
    allowNull: false
  },
  purchaseNum: {
    type: INTEGER,
    defaultValue: 1
  }
});

module.exports = LineItem;
