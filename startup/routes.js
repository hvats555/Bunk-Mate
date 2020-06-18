const express = require("express");

const subjects = require("../routes/subjects");
const attendance = require("../routes/attendance");
const register = require("../routes/register");
const auth = require("../routes/auth");

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/subjects', subjects);
    app.use('/api/attendance', attendance);
    app.use('/api/register', register);
    app.use('/api/auth', auth);
}