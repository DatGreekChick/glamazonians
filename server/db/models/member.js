const crypto = require('crypto'),
      { STRING, DATEONLY } = require('sequelize'),
      db = require('../db');

const Member = db.define('member', {
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
  phone: STRING,
  birthday: DATEONLY,
  salt: STRING,
  googleId: STRING,
  facebookId: STRING,
});

Member.prototype.correctPassword = function (candidatePwd) {
  return Member.encryptPassword(candidatePwd, this.salt) === this.password
};

Member.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
};

Member.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
};

const setSaltAndPassword = member => {
  if (member.changed('password')) {
    member.salt = Member.generateSalt();
    member.password = Member.encryptPassword(member.password, member.salt)
  }
};

Member.beforeCreate(setSaltAndPassword);
Member.beforeUpdate(setSaltAndPassword);

module.exports = Member;
