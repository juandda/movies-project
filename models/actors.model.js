const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const Actor = sequelize.define('actor', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: 0
    },
    age:{
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    profilePic: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: 'active',
      allowNull: false
    }
  });
  
  module.exports = { Actor };
  