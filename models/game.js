const sequelize = require('sequelize');

const db = require('../db');

const { DataTypes } = sequelize;

class Game extends db.Model {}

Game.init({
  title: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },

  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  studio: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  esrb_rating: {
    type: DataTypes.CHAR(5),
    allowNull: false,
  },

  user_rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },

  have_played : {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'game',
});

module.exports = Game;

/* module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game', {
    title: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },

    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    studio: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    esrb_rating: {
      type: DataTypes.CHAR(5),
      allowNull: false,
    },

    user_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },

    have_played : {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  })
}; */
