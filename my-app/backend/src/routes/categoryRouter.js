const express = require("express");
const router = express.Router();

const {
  createCatogoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController
} = require("../controllers/categoryController");

const categoryValidation = require("../validation/categoryValidation");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
// const upload = require("../middlewares/uploadMiddleware")

router.post(
  "/categories",
  authMiddleware,
  adminMiddleware,
  // upload.single("image"),
  categoryValidation,
  createCatogoryController,
);
router.get("/categories", getAllCategoryController);
router.patch(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  updateCategoryController,
);
router.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategoryController,
);
module.exports = router;
