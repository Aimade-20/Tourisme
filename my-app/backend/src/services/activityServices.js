const Activity = require("../models/ActivitySchema")

const createActivity = async (data) => {
    const newActivity = Activity.create({...data})
    return {newActivity}
}
module.exports = {createActivity}