const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require('joi-objectid')(Joi);

const subjectSchema = new mongoose.Schema({
    user : {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
        }
    },
    title : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 100
    },
    attendance : {
        attended : {
            type : Number,
            default : 0
        },
        missed : {
            type : Number,
            default : 0
        },
        total : {
            type : Number,
            default : 0
        },
        percentage : {
            type : Number,
            default : 0
        }
    }
});

subjectSchema.methods.calculatePercentage = function(){
    let percentage = (this.attendance.attended/this.attendance.total) * 100;
    this.attendance.percentage = Math.round(percentage);
}

const validateSubjects = (subject, isNew) => {
    let subjectObject = {
        title : Joi.string().min(2).max(100).required()
    }

    if(isNew.new){
        subjectObject = {
            title : Joi.string().min(2).max(100).required(),
            user : {
                _id : Joi.objectId().required()
            }
        }
    }

    const schema = Joi.object(subjectObject);

    return schema.validate(subject);
}

const validateAttendance = (attendance) => {
    let attendanceObject = {
        status : Joi.string().min(6).max(9).required()
    }

    const schema = Joi.object(attendanceObject);

    return schema.validate(attendance);
}

const Subject = mongoose.model("Subject", subjectSchema);

exports.Subject = Subject;
exports.validateSubjects = validateSubjects;
exports.validateAttendance = validateAttendance;