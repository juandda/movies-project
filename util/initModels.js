const { User } = require('../models/users.model');
const { Review } = require('../models/reviews.model');
const { Movie } = require('../models/movies.model');
const { ActorInMovies } = require('../models/actorsInMovies.model');
const { Actor } = require('../models/actors.model');

const initModels = () => {
    
    //Preliminar relations

    User.hasMany(Review);
    Review.belongsTo(User)

    Movie.hasMany(Review)

    Movie.hasMany(Actor)

    Actor.hasMany(Movie)
}




module.exports = { initModels };