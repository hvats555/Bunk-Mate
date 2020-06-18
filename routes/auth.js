const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let router = express.Router();

const auth = require('../middleware/auth');

const {User, validateLogin} = require('../models/users');

router.get('/me', auth, async (req, res) => {
    let user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// Login route
router.post('/', async (req, res) => {
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(404).send('No user found with given email id');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(401).send('Invalid password');
    console.log(validPassword);

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;


