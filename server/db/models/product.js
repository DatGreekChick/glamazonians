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
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(12, 2)
  },
  QuantityAvilable: {
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
  rating: {
    type: Sequelize.VIRTUAL,

  }
});

module.exports = Product;

// instanceMethods

// Review belongsTo Product and Product hasMany Review makes a ProductId Column on Review

Product.protoype.getAverageRating = () => {
  this.findAndCountAll({
    include: [
       { model: Review, required: true}
    ]
  });
  .then((reviews) => {
    review.rating
  })
};


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
