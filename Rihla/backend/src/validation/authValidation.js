const { body } = require("express-validator");


const registerValidation = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("password must be at least 8 chracters"),
]


const loginValidation = [
  body("email").isEmail().withMessage("valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("password must be at least 8 chracters"),
]


module.exports ={registerValidation,loginValidation}