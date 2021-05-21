const Sequelize = require('sequelize');

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
    dialect: 'postgres'
})

sequelize.authenticate()
  .then(
    () => {
        console.log("Connected to DB");
    },

    err => {
        console.log(`Error: ${err}`);
    },
);

module.exports = sequelize;
