const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function() {
  mongoose
    .connect("mongodb://localhost/movieRental")
    .then(() => winston.info("Connected to MongoDB..."));
  //.catch(err => console.error("Could not connect to MongoDB..."));
};
