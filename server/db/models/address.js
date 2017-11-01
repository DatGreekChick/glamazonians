const { STRING } = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
  line1: {
    type: STRING,
    allowNull: false,
  },
  line2: STRING,
  city: {
    type: STRING,
    allowNull: false,
  },
  state: {
    type: STRING,
    allowNull: false,
  },
  zip: {
    type: STRING,
    allowNull: false,
  }
});

module.exports = Address;
