const mongoose = require("mongoose");
const config = require("config");

const dbConfig = config.get('database');

module.exports = function() {
    mongoose.connect(dbConfig, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => {console.log(`Connected to ${dbConfig}`)})
    .catch((err) => {console.log(`Cannot connect to ${dbConfig} ERROR : ${err}`)});
}