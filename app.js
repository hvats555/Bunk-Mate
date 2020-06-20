const express = require("express");
const winston = require("winston");
let app = express();

require("./startup/db")();
require("./startup/logging")();
require("./startup/routes")(app);

let port = process.env.port | 3000;

let server = app.listen(port, () => {
    winston.info(`Server is happily running on port : ${port}`);
});

module.exports = server;