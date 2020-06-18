const mongoose = require('mongoose');

const loggerSchema = mongoose.Schema({
    user : {
        id : mongoose.Schema.Types.ObjectId,
        email : {
            type : String,
            required : true
        }
    },
    subject : {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },
        title : {
            type : String,
            required : true
        }
    },
    attendance : {
        status : {
            type : String,
            enum : ['attended', 'missed', 'canceled', 'unmarked']
        },
        date : {
            type : Date,
            default : Date.now
        }
    }
})

let Logger = mongoose.model('logger', loggerSchema);

exports.Logger = Logger;