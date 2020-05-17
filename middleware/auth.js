const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied, No token provied by client');
    try{
        const decodedToken = jwt.verify(token, 'Secret');
        req.user = decodedToken;
        next();
    }catch{
        res.status(400).send('Invalid token');
    }
}