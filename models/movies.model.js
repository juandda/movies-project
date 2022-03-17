const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const Movie = sequelize.define('movie', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    duration:{
      type: DataTypes.TIME(50),
      allowNull:false
    },
    rating: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'active',
      allowNull: false
    }
  });
  
module.exports = { Movie };