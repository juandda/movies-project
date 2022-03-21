//Model
const { Actor } = require('../models/actors.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { appError, AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

exports.getAllActors = catchAsync(async(req, res, next) => {
    const actors = await Actor.findAll({
        where:{ status: 'active'}
    });

    res.status(200).json({
        status: 'success',
        data: {
            actors
        }
    });
});

exports.getActorById = catchAsync(async(req, res, next) =>{
    const { id } = req.params;

    const actor = await Actor.findOne({
        where: { id: id, status: 'active' }
    })

    if(!actor){
        return next(
            new AppError(404, 'No actor found with the given ID')
        )
    };

    res.status(200).json({
        status: 'success',
        data:{
            actor
        }
    });
});

exports.createActor = catchAsync(async(req, res, next) =>{
    const { name, country, rating, age, profilePic, status } = req.body;

    if(!name || !country || !rating || !age || !profilePic || !status){
        return next(
            new AppError(
                404,
                'Must provide a valid name, country, rating, age, picture and status'
            )
        );
    };

    const newActor = await Actor.create({
        name: name,
        country: country,
        rating: rating,
        age: age,
        profilePic: '',
        status: status
    });

    res.status(201).json({
        status:'success',
        data:{ newActor }
    })
});

exports.updateActor = catchAsync(async(req, res, next) =>{
    const { id } = req.params;
    const data = filterObj(
        req.body,
        'name',
        'country',
        'age'
    );

    const actor = Actor.findOne({
        where : { id: id, status: 'active'}
    });

    if(!actor){
        return next(
            new AppError(
                404,
                'Must provide a valid name, country or age'
            )
        );
    }

    await actor.update({...data});

    res.status(204).json({
        status: 'success'
    });
});

exports.deleteActor = catchAsync(async(req, res, next) =>{
    const { id } = req.params;

    const actor = await Actor.findOne({
        where: {id: id, status:'active'}
    });

    if(!actor){
        return next(
            new AppError(
                404,
                'Must provide a valid ID'
            )
        );
    }

    await actor.update({ status: 'deleted'});

    res.status(204).json({
        status: 'success'
    })
});