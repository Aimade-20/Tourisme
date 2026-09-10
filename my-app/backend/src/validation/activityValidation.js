const { body } = require("express-validator");

const activityValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Adventure",
      "Culture",
      "Sport",
      "Nature",
      "Food",
      "Entertainment",
    ])
    .withMessage("Invalid category"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid date"),

  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isInt({ min: 1 })
    .withMessage("Duration must be at least 1 hour"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("maxParticipants")
    .notEmpty()
    .withMessage("Maximum participants is required")
    .isInt({ min: 1 })
    .withMessage("Maximum participants must be at least 1"),

  body("availablePlaces")
    .notEmpty()
    .withMessage("Available places is required")
    .isInt({ min: 0 })
    .withMessage("Available places cannot be negative"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

  body("images.*")
    .optional()
    .isString()
    .withMessage("Each image must be a string"),
];

module.exports=activityValidation