const express = require("express");
const mongoose = require("mongoose");
const Fawn = require("fawn");
let app = express();

// Importing routes
const subjects = require("./routes/subjects");
const attendance = require("./routes/attendance");
const db = "mongodb://localhost/bunkMate";

// Database connection
mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => {console.log("Connected to Database")})
    .catch((err) => {console.log(`Cannot connect to database ERROR : ${err}`)});

// Initializing routes
app.use(express.json());
app.use('/api/subjects', subjects);
app.use('/api/attendance', attendance);

let port = process.env.port | 3000;

app.listen(port, () => {
    console.log(`Server is happily running on port : ${port}`);
});