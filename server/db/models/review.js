const { STRING, BOOLEAN, RANGE, INTEGER, TEXT } = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  title: {
    type: STRING
  },
  verifiedPurchase: {
    type: BOOLEAN,
    defaultValue: false
  },
  rating: {
    type: INTEGER,
    defaultValue: 3,
    allowNull: false
  },
  description: {
    type: TEXT,
    allowNull: false
  }
});

// TODO: to check a verified purchase
//   the method would have to check the user order history's line items for matching pruduct id maybe?
//
// hooks

Review.beforeCreate(review => {
  if (!review.title) {
    review.title = review.description.slice(0, 12) + '...';
  }
});

module.exports = Review;
