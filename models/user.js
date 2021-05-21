const { DataTypes, Model } = require('sequelize');

const db = require('../db');

class User extends Model {}

User.init({
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
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
