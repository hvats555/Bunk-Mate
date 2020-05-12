const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
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

const Subject = mongoose.model("Subject", subjectSchema);

exports.Subject = Subject;