const Activity = require ("../models/ActivitySchema")



const createActivity = async (ActivityData , userId) => {
        const activity = await Activity.create(({
            ...ActivityData ,
             guide : userId
        }))
        return activity
}

module.exports = {createActivity}