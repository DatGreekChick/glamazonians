const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'http://placecage.com/400/400'
  },
  price: {
    type: Sequelize.DECIMAL(12, 2)
  },
  quantityAvilable: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
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
  },

});

module.exports = Product;

// classMethods

Product.findSimilarByTag = (tag) => {
  this.findAll({
    where: {
      tags: {
        $contains: [tag]
      }
    }
  });
};
