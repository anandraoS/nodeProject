const Joi = require("Joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 250
  }
});
const Movie = mongoose.model("Movie", movieSchema);
function validateMovie(movie) {
  const schema = {
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(255),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(250)
  };
}

exports.Movie  = Movie;
exports.validate = validateMovie;