const express = require("express");
const _ = require("lodash");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


// Database models
let {User} = require('../models/users');

router.post("/", async (req, res) => {
    let user = new User(_.pick(req.body, ['name', 'email', 'password']));
    user = await user.save();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
});

module.exports = router;