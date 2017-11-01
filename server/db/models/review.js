const Sequelize = require('sequelize');
const db = require('../db');

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
    defaultValue: 3,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// TODO: to check a verified purchase
//   the method would have to check the user order history's line items for matching pruduct id maybe?
//
// hooks

Review.beforeCreate((review) => {
  if(!review.title){
    review.title = review.description.slice(0,12) + "...";
  }
});
