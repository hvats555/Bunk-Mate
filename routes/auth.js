const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let router = express.Router();

const auth = require('../middleware/auth');

const {User} = require('../models/users');

router.get('/me', auth, async (req, res) => {
    let user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// Login route
router.post('/', async (req, res) => {
    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.send(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;


