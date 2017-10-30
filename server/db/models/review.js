const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
  },
  verifiedPurchase: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: Sequelize.RANGE(Sequelize.INTEGER(1,5)),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

// hooks

Review.beforeCreate((review) => {
  if(!review.title){
    review.title = review.description.slice(0,12) + "..."
  }
})


module.exports = Review
