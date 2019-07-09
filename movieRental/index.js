const winston = require('winston');
const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/config")();
require('./startup/validation')();
// throw new Error('Something failed during startup');

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
