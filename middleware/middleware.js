const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({ message: 'Access denied. Token is missing.'});
    }

    try{    
        console.log('token', token);
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        console.log('decoded', decoded);
        next();
    } catch(err){
        return res.status(400).json({ message: 'Invalid token.'});
    }
}

module.exports = verifyToken;