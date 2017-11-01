const { STRING, DECIMAL, INTEGER, TEXT, ARRAY } = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false
  },
  image: {
    type: STRING,
    defaultValue: 'http://placecage.com/400/400'
  },
  price: DECIMAL(12, 2, 'int'),
  quantityAvailable: INTEGER,
  description: TEXT,
  tags: {
    type: ARRAY(STRING),
    defaultValue: [],
    set: function(tags) {
      tags = tags || [];

      if (typeof tags === 'string') {
        tags = tags.split(',').map(function(str) {
          return str.trim();
        });
      }
      this.setDataValue('tags', tags);
    }
  }
});

// classMethods
Product.findSimilarByTag = tag => {
  this.findAll({
    where: {
      tags: {
        $contains: [tag]
      }
    }
  });
};

module.exports = Product;
