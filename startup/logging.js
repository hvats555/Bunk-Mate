require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function(){
    winston.add(new winston.transports.File({filename : "logfile.log"}));
    winston.add(new winston.transports.MongoDB({db : "mongodb://localhost/vidly"}));

    winston.exceptions.handle(new winston.transports.File({filename : "uncaughtExceptions.log"}));

    process.on("unhandledRejection", (ex) => {
        throw ex;
    });
}