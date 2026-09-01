const {validationResult} =require("express-validator")
const {register} =require("../services/authServices")

const registerUser = async(req , res ,next) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors :errors.array()})
        }
        const user = await register(req.body)
        res.status(201).json({massage :"user created successfully" ,userId: user._id})
    } catch (error) {
        next(error)
    }
}

module.exports={registerUser}