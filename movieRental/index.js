require("express-async-errors");
const config = require("config");
const Joi = require("joi");
const winston = require("winston");
require("winston-mongodb");
const error = require("./middleware/error");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/user");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

winston.handleExceptions(new winston.transports.File({filename:'unhandledExceptions.log'}));
process.on('unhandledRejection', (ex)=>{
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logfile.log"}));
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/movieRental",
level: 'info'})
);

// throw new Error('Something failed during startup');

const p = Promise.reject(new Error('something failed miserably'));

p.then(()=> console.log('done'));
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/movieRental")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
