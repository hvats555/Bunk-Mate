const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
    attendanceId : mongoose.Types.ObjectId,
    type : Date,
    required : true,
    status : {
        type : String,
        required : true,
        enum : ['attended', 'missed', 'canceled', 'unmarked']
    }
})