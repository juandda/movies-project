const express = require('express');

//Controllers
const{
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieById
} = require('../controllers/movies.controller');

const{ validateSession, protectAdmin } = require('../middlewares/auth.middleware')

const router = express.Router();

router.use(validateSession);

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.use(protectAdmin);

router.post('/', createMovie);

router.patch('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router};