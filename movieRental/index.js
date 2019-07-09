
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging");
// throw new Error('Something failed during startup');
process.on("unhandledRejection", ex => {
  throw ex;
});

const p = Promise.reject(new Error("something failed miserably"));

p.then(() => console.log("done"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
