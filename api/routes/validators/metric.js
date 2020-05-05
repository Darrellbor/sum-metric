const { body } = require("express-validator");

module.exports.metricValidator = [
  body("value")
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("A numeric value is required!")
];
