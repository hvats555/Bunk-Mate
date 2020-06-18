const express = require('express');
const validator = require('validator');
const validateObjectId = require("../middleware/validateObjectId");
let router = express.Router();

// Subjects Model import
let {Subject, validateSubjects} = require("../models/subjects");
// auth middleware

let auth = require("../middleware/auth");

router.get('/', auth, async (req, res) => {
    let subjects = await Subject.find({}).sort('name');
    res.send(subjects);
});

router.get("/:id", [validateObjectId, auth], async (req, res) => {
    let subject = await Subject.findById(req.params.id);
    res.send(subject);
});

router.post('/', auth, async (req, res) => {
    const newSubject = {
        user : {
            _id : req.user._id
        },
        title : req.body.title
    }
    const {error} = validateSubjects(newSubject, {new : true});
    if(error) return res.status(400).send(error.details[0].message);

    let subject = new Subject(newSubject);

    subject = await subject.save();
    res.send(subject);
});

router.put('/:id', [validateObjectId, auth], async (req, res) => {
    const {error} = validateSubjects({title : req.body.title}, {new : false});
    if(error) return res.status(400).send(error.details[0].message);

    let subject = await Subject.findByIdAndUpdate(req.params.id, {title : req.body.title}, {
        new : true
    });

    res.send(subject);
});

router.delete("/:id", [validateObjectId, auth], async (req, res) => {
    let subject = await Subject.findByIdAndDelete(req.params.id);
    if(!subject) return res.status(404).send("No subject yound with the input id");
    res.status(200).send(`Deleted the subject\n${subject}`);
});



module.exports = router;
