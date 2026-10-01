const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory
} = require("../services/categoryServices");

const createCatogoryController = async (req, res, next) => {
  try {
    const category = await createCategory(req.body);
    return res.status(201).json({
      message: "category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllCategoryController = async (req, res, next) => {
  try {
    const categorys = await getAllCategory();
    if (!categorys) {
      return res.status(404).json({
        message: "categorys not found",
      });
    }
    return res.status(200).json({
      message: "successfully",
      categorys,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCategoryController = async (req, res, next) => {
  try {
    const category = await updateCategory(req.params.id, req.body);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    return res.status(200).json({
      message: "successfully",
      newCategory: category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCategoryController = async (req, res, next) => {
  try {
    const category = await deleteCategory(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      category
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCatogoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController
};
