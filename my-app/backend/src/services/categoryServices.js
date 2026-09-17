const Catogory = require("../models/Category")


const createCatogory = async (name , image) => {
    const category = await Catogory.create(name , image)
    return category
}
module.exports = createCatogory