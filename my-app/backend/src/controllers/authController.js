const {validationResult} =require("express-validator")
const {register,login} =require("../services/authServices")

const registerUser = async(req , res ,next) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors :errors.array()})
        }
        const user = await register(req.body)
        res.status(201).json({massage :"user created successfully" ,userId: user._id ,User : user})
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req , res ) => {
    try {
        const {email ,password} = req.body

        const token = await login({email,password})
        console.log("TOKEN:", token);

       return res.status(200).json({token : token})
    } catch (error) {
        return res.status(401).json({
      error: error.message
    })
    }
}

module.exports={registerUser ,loginUser}