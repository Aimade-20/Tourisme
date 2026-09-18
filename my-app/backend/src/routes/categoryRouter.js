const express = require("express")
const router = express.Router()


const createCatogoryController = require ("../controllers/categoryController")

const categoryValidation = require("../validation/categoryValidation")

const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")
const upload = require("../middlewares/uploadMiddleware")

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    categoryValidation,
    createCatogoryController
);
module.exports = router