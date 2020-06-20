const express = require('express');
let router = express.Router();

let auth = require('../middleware/auth');
let validateObjectId = require('../middleware/validateObjectId')

let {Subject, validateAttendance} = require('../models/subjects');

router.patch('/:id', [validateObjectId, auth], async (req, res) => {
    const {error} = validateAttendance({status : req.body.status});
    if(error) return res.status(400).send(error.details[0].message);


    const attendanceStatus = req.body.status;
    let updateAttendance = null;

    if(attendanceStatus == 'missed'){
        updateAttendance = 'attendance.missed';
    }else if(attendanceStatus == 'attended'){
        updateAttendance = 'attendance.attended';
    }else{
        return res.status(400).send("Invalid status input : Value of status can be from 'missed' or 'attended'");
    }
    
    let subject = await Subject.findOneAndUpdate(req.params.id, {
        $inc : {
                'attendance.total' : 1,
                [updateAttendance] : 1
            }
        }, {new : true});
            
    await subject.calculatePercentage();

    res.send(subject);
});

module.exports = router;

