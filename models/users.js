const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 255
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    targetAttendance : {
        type : Number,
        default : 75
    }
});

userSchema.methods.generateAuthToken = function(){
    const payload = {
        _id : this._id,
        name : this.name,
        targetAttendance : this.targetAttendance
    }
    const token = jwt.sign(payload, 'Secret');
    return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;