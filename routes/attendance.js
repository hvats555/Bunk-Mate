const express = require('express');
const Fawn = require("fawn");
const mongoose = require("mongoose");
let router = express.Router();

let {Subject} = require('../models/subjects');
Fawn.init(mongoose);

router.patch('/:id', async (req, res) => {
    const attendanceStatus = req.body.status;
    let updateAttendance = null;

    if(attendanceStatus == 'missed'){
        updateAttendance = 'attendance.missed';
    }else if(attendanceStatus == 'attended'){
        updateAttendance = 'attendance.attended';
    }else{
        res.send("Invalid request");
    }
    
    // try{
    //     new Fawn.Task()
    //         .update('subjects', {_id : mongoose.Types.ObjectId(req.params.id)}, {
    //             $inc : {'attendance.total' : 1, [updateAttendance] : 1},
    //             //$set : {'percentage' : {$multiply:[{$divide:["$attendance.attended", "$attendance.total"]}, 100]}}
    //             //db.subjects.aggregate()
    //             //"percent": {$multiply:[{$divide:["$users.votes","$sum"]},100]}
    //         })
    //         .run()
    //         .then((result) => {
    //             res.send(result);
    //         });
    // }catch(err){
    //     res.status(500).send(err);
    // }

    let subject = await Subject.findOneAndUpdate(req.params.id, {
        $inc : {
                'attendance.total' : 1,
                [updateAttendance] : 1
            }
        }, {new : true});
            
    let percentage = await subject.calculatePercentage();
    res.send(subject);
});

module.exports = router;
