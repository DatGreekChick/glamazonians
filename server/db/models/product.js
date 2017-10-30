const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(12,2)
  },
  QuantityAvilable: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT
  },
  tags: {
    type: Sequelize.ARRAY(STRING)
  }
})

module.exports = Product

/**
 * instanceMethods
 // after the Reviews Model is done add a method to get the average review rating
/**
 * classMethods

/**
 * hooks
 */
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt()
//     user.password = User.encryptPassword(user.password, user.salt)
//   }
// }
//
// User.beforeCreate(setSaltAndPassword)
// User.beforeUpdate(setSaltAndPassword)
