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
  // rating: {
  //   type: Sequelize.VIRTUAL,
  //   get() {
  //     return this.getAverageRating();
  //   }
  // }
});

module.exports = Product;

// instanceMethods

// TO DO after review is merged
// Review belongsTo Product and Product hasMany Review makes a ProductId Column on Review

// Product.protoype.getAverageRating = () => {
//   return this.findAll({
//     include: [
//        { model: Review, required: true}
//     ]
//   });
//   .then((reviews) => {
//     const average = reviews.reduce((sum, value)=> {
//       return sum + value.rating;
//     }, 0);
//     return (average/reviews.length);
//   });
//   .catch(err) => console.error(err);
// };


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
