const bcrypt = require('bcryptjs');

//Model
const { User } = require('../models/users.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { appError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.findAll({
        where:{ status: 'active'}
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

    if( !username || !email || !password || !status || !role){
        return next(
            new AppError(
                404,
                'username, email, password, status and role'
            )
        );
    };

    const salt = await bcrypt.genSalt(12);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await Actor.create({
        username,
        email,
        password: hashPassword,
        status,
        role
    });

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