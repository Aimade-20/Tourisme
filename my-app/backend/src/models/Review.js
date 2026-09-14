const mongoose = require("mongoose")


 const ReviewSchema = new mongoose.Schema (
    {
        Activity : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Activity",
            required : true,
        },
        User :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        rating :{
            type : Number ,
            required: true ,
            min : 1 ,
            max : 5,
        },
        comment:{
            type : String ,
        }
    }
)

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;