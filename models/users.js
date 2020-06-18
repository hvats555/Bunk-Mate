const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Joi = require("@hapi/joi");
Joi.objectId = require('joi-objectid')(Joi);


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


const validateRegistration = (userInformation) => {
    let userInformationObject  = {
            name : Joi.string().min(2).max(255).required(),
            email : Joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password : Joi.string().min(1).max(255).required()
    }

    const schema = Joi.object(userInformationObject);

    return schema.validate(userInformation);
}

const validateLogin = (loginInformation) => {
    let loginInformationObject = {
        email : Joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password : Joi.string().min(1).max(255).required()
    }

    const schema = Joi.object(loginInformationObject);
    return schema.validate(loginInformation)
}

exports.User = User;
exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;