const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/glamazonians', {
    logging: false,
    operatorsAliases: false
  }
);

module.exports = db;
