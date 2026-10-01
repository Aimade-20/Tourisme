const jwt = require("jsonwebtoken")
const User = require ("../models/User.js")

const authMiddleware = async (req ,res ,next ) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({error :"No token provided"})
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log("decoded" ,decoded);
        
        const user = await User.findById(decoded.userID)
        // console.log("user" , user);

        if(!user) {
            return res.status(401).json({error :"User not found"})
        }
            req.user=user
        next()
    } catch (error) {
        return res.status(401).json({error :"invalid token"})
    }
}
module.exports=authMiddleware