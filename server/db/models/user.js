const crypto = require('crypto'),
      { STRING, DATEONLY, BOOLEAN } = require('sequelize'),
      db = require('../db');

const User = db.define('user', {
  email: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      min: 8,
      max: 24,
    },
  },
  address: {
    type: STRING,
    allowNull: false,
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  phone: STRING,
  birthday: DATEONLY,
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
