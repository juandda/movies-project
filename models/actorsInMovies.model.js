const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

//Models
const {Actor} = require('./actors.model')
const { Movie } = require('./movies.model')

const ActorInMovies = sequelize.define('actorInMovies', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    actorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Actor,
        key: 'id'
      }
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: 'id'
      }
    }
  });


  module.exports = { ActorInMovies };
  