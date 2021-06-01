/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const dbConfig = require("../config/db.config.js");

const Keyword = require('./keyword.model');
const User = require('./user.model');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Keyword = require("./keyword.model.js")(sequelize, Sequelize);
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Cvss = require("./cvss.model.js")(sequelize, Sequelize)
db.Company = require("./company.model.js")(sequelize, Sequelize)



module.exports = db;