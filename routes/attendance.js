const express = require('express');
const Fawn = require("fawn");
const mongoose = require("mongoose");
let router = express.Router();

let auth = require('../middleware/auth');

let {Subject} = require('../models/subjects');
let {Logger} = require('../models/logger');

Fawn.init(mongoose);

router.patch('/:id', auth, async (req, res) => {
    const attendanceStatus = req.body.status;
    let updateAttendance = null;

    if(attendanceStatus == 'missed'){
        updateAttendance = 'attendance.missed';
    }else if(attendanceStatus == 'attended'){
        updateAttendance = 'attendance.attended';
    }else{
        res.send("Invalid request");
    }
    
    let subject = await Subject.findOneAndUpdate(req.params.id, {
        $inc : {
                'attendance.total' : 1,
                [updateAttendance] : 1
            }
        }, {new : true});
            
    let percentage = await subject.calculatePercentage();

    let logDetails = {
        subject : {
            _id : subject._id,
            title : subject.title
        },
        attendance : {
            status : attendanceStatus
        }
    }

    let logger = new Logger(logDetails);
    logger = await logger.save();
    res.send(logger);
});

module.exports = router;
