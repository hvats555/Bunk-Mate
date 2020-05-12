const express = require('express');
let router = express.Router();

// Subjects Model import
let {Subject} = require("../models/subjects");

router.get('/', async (req, res) => {
    let subjects = await Subject.find({}).sort('name');
    res.send(subjects);
});

router.get("/:id", async (req, res) => {
    let subject = await Subject.findById(req.params.id);
    res.send(subject);
});

router.post('/', async (req, res) => {
    let subject = new Subject({ title : req.body.title });

    subject = await subject.save();
    res.send(subject);
});

router.put('/:id', async (req, res) => {
    let subject = await Subject.findByIdAndUpdate(req.params.id, {title : req.body.title}, {
        new : true
    });

    res.send(subject);
});

router.delete("/:id", async (req, res) => {
    let subject = await Subject.findByIdAndDelete(req.params.id);
    res.send(subject);
});

module.exports = router;
