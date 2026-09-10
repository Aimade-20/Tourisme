
const guideMiddleware   = (req , res , next) => {

    try {
        if(req.user.role !== "guide" || !req.user.isApproved){
        return res.status(403).json({
            message : "Only approved guides can create activities"
        })
    }
    } catch (error) {
        next()
    } 
}

module.exports=guideMiddleware