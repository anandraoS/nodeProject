const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "unhandledExceptions.log" })
  );
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/movieRental",
      level: "error"
    })
  );
};
