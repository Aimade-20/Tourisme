const { body } = require("express-validator");

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be between 3 and 100 characters"),
  body("image")
  .trim()
  .optional()
  .isURL
  .withMessage("image must be a valid URL"),
];


module.exports = categoryValidation