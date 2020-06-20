const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");

const dbConfig = config.get('database');

module.exports = function() {
    mongoose.connect(dbConfig, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => {winston.info(`Connected to ${dbConfig}`)})
    .catch((err) => {winston.error(`Cannot connect to ${dbConfig} ERROR : ${err}`)});
}