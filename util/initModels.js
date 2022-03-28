const { User } = require('../models/users.model');
const { Review } = require('../models/reviews.model');
const { Movie } = require('../models/movies.model');
const { ActorInMovies } = require('../models/actorsInMovies.model');
const { Actor } = require('../models/actors.model');

const initModels = () => {

    User.hasMany(Review);
    Review.belongsTo(User);

    Movie.hasMany(Review);
    Review.belongsTo(Movie);

    Movie.belongsToMany(Actor, { through: ActorInMovies });
    Actor.belongsToMany(Movie, { through: ActorInMovies });
}




module.exports = { initModels };