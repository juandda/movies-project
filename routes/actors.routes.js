const express = require('express');

//Controllers
const{
    getAllActors,
    createActor,
    updateActor,
    deleteActor,
    getActorById
} = require('../controllers/actors.controller');

//Utils
const { upload } = require('../util/multer')
const{ validateSession, protectAdmin } = require('../middlewares/auth.middleware')

const router = express.Router();

router.use(validateSession);

router.get('/', getAllActors);

router.get('/:id', getActorById);

router.use(protectAdmin);

router.post('/', upload.single('actorImg'),createActor);

router.patch('/:id', updateActor);

router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router};