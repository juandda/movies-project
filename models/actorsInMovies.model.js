const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const ActorInMovies = sequelize.define('actorInMovies', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });


  module.exports = { ActorInMovies };
  