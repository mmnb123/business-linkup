// const Users = require("../models/userModel");
// const jwt = require('jsonwebtoken');

// const auth = async (req,res,next) =>{
//     try {
//         const token = req.header("Authorization")

//         if(!token)  return res.status(500).json({msg: "Not Valid"})

//         const decoded = jwt.verify(token, process.env.ACCESSTOKENSECRET)
//         if(!decoded)  return res.status(500).json({msg: "Not Valid"})
        
//         const user = await Users.findOne({_id: decoded.id})
       
//         req.user = user;
        
//         next();
        
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// }

// module.exports = auth;
const Users = require("../models/userModel");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // Get token from the header
        const token = req.header("Authorization").replace('Bearer ', '');
        if (!token) {
            console.error('No token provided');
            return res.status(401).json({ msg: "Authorization denied, no token" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESSTOKENSECRET);
        if (!decoded) {
            console.error('Token verification failed');
            return res.status(401).json({ msg: "Token verification failed" });
        }

        // Find user by decoded id
        const user = await Users.findOne({ _id: decoded.id });
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ msg: "User not found" });
        }

        // Attach user to request object
        req.user = user;
        
        next();
        
    } catch (err) {
        // Log specific errors for debugging
        if (err.name === 'TokenExpiredError') {
            console.error('Token expired:', err);
            return res.status(401).json({ msg: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            console.error('Invalid token:', err);
            return res.status(401).json({ msg: 'Invalid token' });
        } else {
            console.error('Internal server error:', err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
}

module.exports = auth;