require("express-async-errors");
const config = require("config");
const Joi = require("joi");
const winston = require("winston");
require("winston-mongodb");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/db")();
winston.exceptions.handle(
  new winston.transports.File({ filename: "unhandledExceptions.log" })
);
process.on("unhandledRejection", ex => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/movieRental",
    level: "error"
  })
);

// throw new Error('Something failed during startup');

const p = Promise.reject(new Error("something failed miserably"));

p.then(() => console.log("done"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
