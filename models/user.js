const {
  DataTypes: { STRING },
  Model,
} = require('sequelize');

const db = require('../db');

class User extends Model {}

User.init({
  full_name: {
    type: STRING,
    allowNull: false
  },

  username: {
    type: STRING,
    allowNull: false
  },

  passwordHash: {
    type: STRING,
    allowNull: false
  },

  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  sequelize: db,
  modelName: 'user',
});

module.exports = User;
