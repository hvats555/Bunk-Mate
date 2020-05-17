const express = require('express');
let router = express.Router();

// Subjects Model import
let {Subject} = require("../models/subjects");

// auth middleware

let auth = require("../middleware/auth");

router.get('/', auth,async (req, res) => {
    let subjects = await Subject.find({}).sort('name');
    res.send(subjects);
});

router.get("/:id", auth, async (req, res) => {
    let subject = await Subject.findById(req.params.id);
    res.send(subject);
});

router.post('/', auth, async (req, res) => {
    let subject = new Subject({ title : req.body.title });

    subject = await subject.save();
    res.send(subject);
});

router.put('/:id', auth, async (req, res) => {
    let subject = await Subject.findByIdAndUpdate(req.params.id, {title : req.body.title}, {
        new : true
    });

    res.send(subject);
});

router.delete("/:id", auth, async (req, res) => {
    let subject = await Subject.findByIdAndDelete(req.params.id);
    res.send(subject);
});

module.exports = router;
