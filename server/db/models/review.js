const { STRING, INTEGER, TEXT } = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  title: {
    type: STRING
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

Review.beforeCreate(review => {
  if (!review.title) {
    review.title = review.description.slice(0, 12) + '...';
  }
});

module.exports = Review;
