const express = require('express');

//Controllers
const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../controllers/users.controller');

//Middlewares
const{ validateSession, protectAdmin } = require('../middlewares/auth.middleware')

const { userExists } = require('../middlewares/users.middleware')

const router = express.Router();

router.post('/login', loginUser);

router.post('/', createUser);

router.use(validateSession);

router.use(protectAdmin);

router.get('/',getAllUsers);

router.get('/:id',getUserById);

router.patch('/:id',updateUser);

router.delete('/:id',deleteUser);

module.exports = { usersRouter: router};