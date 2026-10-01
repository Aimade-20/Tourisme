const Category = require("../models/Category")


const createCategory = async (data) => {
    const category = await Category.create(data)
    // console.log("category Ser" ,category);
    
    return category
}


const getAllCategory = async () => {
    const categorys = await Category.find()
    return categorys
}

const updateCategory = async (id , data) => {
    const category = await Category.findByIdAndUpdate(id , data ,{ new: true })
    return category
}

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  return category;
};
module.exports = {createCategory ,getAllCategory ,updateCategory,deleteCategory}