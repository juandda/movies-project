const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Model
const { User } = require('../models/users.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

dotenv.config({path: './config.env'});

exports.loginUser = catchAsync(async(req, res, next) =>{
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {email, status: 'active'}
    });

    if(! user || !(await bcrypt.compare(password, user.password))){
        return next(new AppError(400, 'Credentials are invalid'));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    res.status(200).json({
        status: 'success',
        data: { token }
    })
});

exports.getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.findAll({
        where:{ status: 'active'},
        attributes:{
            exclude: ['password']
        }
    });

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});

exports.getUserById = catchAsync(async(req, res, next) =>{
    const { id } = req.params;

    const user = await User.findOne({
        where: { id: id, status: 'active' }
    })

    if(!user){
        return next(
            new AppError(404, 'No user found with the given ID')
        )
    };

    res.status(200).json({
        status: 'success',
        data:{
            user
        }
    });
});

exports.createUser = catchAsync(async(req, res, next) =>{
    const { username, email, password, status, role} = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username,
        email,
        password: hashPassword,
        status,
        role
    });

    newUser.password = undefined;

    res.status(201).json({
        status:'success',
        data:{ newUser }
    })
});

exports.updateUser = catchAsync(async(req, res, next) =>{
    const { id } = req.params;
    const data = filterObj(
        req.body,
        'username',
        'email'
    );

    const user = User.findOne({
        where : { id: id, status: 'active'}
    });

    if(!user){
        return next(
            new AppError(
                404,
                'Must provide a valid username or email'
            )
        );
    }

    await user.update({...data});

    res.status(204).json({
        status: 'success'
    });
});

exports.deleteUser = catchAsync(async(req, res, next) =>{
    const { id } = req.params;

    const user = await User.findOne({
        where: {id: id, status:'active'}
    });

    if(!user){
        return next(
            new AppError(
                404,
                'Must provide a valid ID'
            )
        );
    }

    await user.update({ status: 'deleted'});

    res.status(204).json({
        status: 'success'
    })
});