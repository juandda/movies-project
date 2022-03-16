const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

// Localhost connection
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: process.env.DB_DATABASE,
    dialect:'postgres'
})

module.exports = ({ sequelize });