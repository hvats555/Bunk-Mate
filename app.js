const express = require("express");
const winston = require("winston");
const config = require("config");
let app = express();

require("./startup/db")();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/prod")(app);

let port = process.env.PORT || 3000;

let server = app.listen(port, () => {
    winston.info(`Server is happily running on port : ${port}`);
});

module.exports = server;