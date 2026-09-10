const { validationResult} = require("express-validator")
const {createActivity} = require("../services/ActivityServices")


const activitysControlle = async (req , res , next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors :errors.array()})
        }
        const activity = await createActivity(req.body,req.user._id)
      return res.status(201).json({message :"activity created successfully" ,activityId: activity._id ,Activity : activity})
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}
module.exports = {activitysControlle}