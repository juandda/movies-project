const express = require('express');

//Controllers
const { globalErrorHandler } = require('./controllers/error.controller')

//Routers
const { usersRouter } = require('./routes/users.routes');
const { moviesRouter } = require('./routes/movies.routes');
const { actorsRouter } = require('./routes/actors.routes');

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', usersRouter );
app.use('/api/v1/movies', moviesRouter );
app.use('/api/v1/actors', actorsRouter );

module.exports = { app }