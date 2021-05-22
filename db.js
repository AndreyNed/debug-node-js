const Sequelize = require('sequelize');

const {
  DB,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize.authenticate()
  .then(
    () => { console.log('Connected to DB'); },
  )
  .catch(err => { console.log(`Error: ${err}`); });

module.exports = sequelize;
