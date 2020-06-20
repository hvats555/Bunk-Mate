const jwt = require('jsonwebtoken');
const config = require("config");

const privateKey = config.get("privateKey")

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied, No token provied by client');
    try{
        const decodedToken = jwt.verify(token, privateKey);
        req.user = decodedToken;
        next();
    }catch{
        res.status(400).send('Invalid token');
    }
}