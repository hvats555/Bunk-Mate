const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 100
    },
    classes : {
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
        }
    }
});

const Subject = mongoose.model("Subject", subjectSchema);

exports.Subject = Subject;