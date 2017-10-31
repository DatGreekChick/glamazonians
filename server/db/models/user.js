const crypto = require('crypto-browserify'),
      { STRING, BOOLEAN } = require('sequelize'),
      db = require('../db');

const User = db.define('user', {
  email: {
    type: STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    validate: {
      min: 8,
      max: 24,
    },
  },
  name: STRING,
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  salt: STRING,
  googleId: STRING,
  facebookId: STRING,
});

User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
};

User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
};

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
