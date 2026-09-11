const {body} = require("express-validator");

const reservationsValidation = [
  body("numberOfPlaces")
    .notEmpty()
    .withMessage("numberOfPlaces is required")
    .isInt({ min: 1 })
    .withMessage("Number of places must be at least 1"),
];
module.exports = reservationsValidation
