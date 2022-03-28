const { ref } = require('firebase/storage')

//Model
const { Movie } = require('../models/movies.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { appError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { storage } = require('../util/firebase')

exports.getAllMovies = catchAsync(async(req, res, next) => {
    const movies = await Movie.findAll({
        where:{ status: 'active'}
    });

    res.status(200).json({
        status: 'success',
        data: {
            movies
        }
    });
});
exports.getMovieById = catchAsync(async(req, res, next) =>{
    const { id } = req.params;

    const movie = await Movie.findOne({
        where: { id: id, status: 'active' }
    })

    if(!movie){
        return next(
            new AppError(404, 'No movie found with the given ID')
        )
    };

    res.status(200).json({
        status: 'success',
        data:{
            movie
        }
    });
});
exports.createMovie = catchAsync(async(req, res, next) =>{
    const { title, description, duration, rating, img, genre, status } = req.body;

    if(!title || !description || !duration || !rating || !img || !genre || !status){
        return next(
            new AppError(
                404,
                'Must provide a valid title, description, duration, rating, img, genre and status'
            )
        );
    };

    const imgRef = ref(storage, req.file.originalName);
    const result = await uploadBytes(imgRef, req.file.buffer)

    const newMovie = await Movie.create({
        title: title,
        description: description,
        duration: duration,
        rating: rating,
        img: result.metadata.fullPath,
        genre: genre,
        status: status
    });

    res.status(201).json({
        status:'success',
        data:{ newMovie }
    })
});

exports.updateMovie = catchAsync(async(req, res, next) =>{
    const { id } = req.params;
    const data = filterObj(
        req.body,
        'title',
        'description',
        'duration',
        'genre'
    );

    const movie = Movie.findOne({
        where : { id: id, status: 'active'}
    });

    if(!movie){
        return next(
            new AppError(
                404,
                'Must provide a valid title, description, duration or genre'
            )
        );
    }

    await movie.update({...data});

    res.status(204).json({
        status: 'success'
    });
});

exports.deleteMovie = catchAsync(async(req, res, next) =>{
    const { id } = req.params;

    const movie = await Movie.findOne({
        where: {id: id, status:'active'}
    });

    if(!movie){
        return next(
            new AppError(
                404,
                'Must provide a valid ID'
            )
        );
    }

    await movie.update({ status: 'deleted'});

    res.status(204).json({
        status: 'success'
    })
});