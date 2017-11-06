const { STRING, INTEGER, TEXT, ARRAY, Op: { contains } } = require('sequelize');
const db = require('../db');

const Product = db.define(
  'product',
  {
    name: {
      type: STRING,
      unique: true,
      allowNull: false
    },
    image: {
      type: STRING,
      defaultValue: 'http://placecage.com/400/400'
    },
    price: {
      type: INTEGER,
      set: function(val) {
        let dollars;
        if (typeof val === 'string') {
          dollars = parseInt(val);
        } else {
          dollars = val;
        }
        this.setDataValue('price', dollars * 100);
      }
    },
    quantityInCart: { type: INTEGER, defaultValue: 0 },
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
  },
  {
    getterMethods: {
      priceInDollars: function() {
        let pennies = this.getDataValue('price');

        return parseFloat(pennies / 100).toFixed(2);
      }
    }
  }
);

// instanceMethods
Product.prototype.removeTag = function(tag) {
  tag = tag.toString();
  let arrCopy = this.getDataValue('tags');
  let index = arrCopy.indexOf(tag.toLowerCase());

  if (index !== -1) {
    arrCopy.splice(index, 1);
  }
  this.setDataValue('tags', arrCopy);
};

Product.prototype.addTag = function(tag) {
  tag = tag.toString();
  let arrCopy = this.getDataValue('tags');
  arrCopy.push(tag.toLowerCase());
  this.setDataValue('tags', arrCopy);
};

// classMethods
Product.findSimilarByTag = function(tag) {
  return this.findAll({
    where: {
      tags: {
        [contains]: [tag]
      }
    }
  });
};

module.exports = Product;
