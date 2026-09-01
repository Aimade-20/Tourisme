const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser } = require("../controllers/authController");
// const validate = require("../middlewares/authMiddleware");

const registerValidation = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 chracters"),
];

router.post("/register", registerValidation, registerUser);

module.exports = router;