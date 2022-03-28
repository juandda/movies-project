const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util')

//Utils
const {  AppError} = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

//Model
const { User } = require ('../models/users.model')


dotenv.config({path: './config.env'});

exports.validateSession = catchAsync(async(req, res, next) =>{
     
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError(401, 'Invalid Session'));
    }

    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findOne({
        where: {id: decodedToken.id, status: 'active'},
        attributes:{
            exclude: ['password']
        }
    });

    if(!user){
        return next(new AppError( 401, 'Invalid session'));
    }

    req.currentUser = user;

    next();
});

exports.protectAdmin = catchAsync(async (req, res, next) =>{
    if(req.currentUser.role !== 'admin'){
        return next(new AppError(403, 'Access denied'));
    }
    next()
})