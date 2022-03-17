const express = require('express');

//Controllers
const{
    getAllActors,
    createActor,
    updateActor,
    deleteActor
} = require('../controllers/actors.controller');

const router = express.Router();

router.get('/', getAllActors);

router.post('/', createActor);

router.patch('/:id', updateActor);

router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router};