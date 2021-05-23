const Sequelize = require('sequelize');

const log = require('./utils/log');

const {
  DB,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
} = process.env;

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  debug: false,
})

sequelize.authenticate()
  .then(() => { log.success("Connected to DB"); })
  .catch(err => { log.error(`Error: ${err}`); });

module.exports = sequelize;
