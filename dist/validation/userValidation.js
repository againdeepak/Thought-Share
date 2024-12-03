"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
exports.userValidation = [
    // First Name
    (0, express_validator_1.body)("userName")
        .exists().withMessage("First Name is required.")
        .bail()
        .isString().withMessage("First Name must be a valid string."),
    // Email
    (0, express_validator_1.body)("email")
        .exists().withMessage("Email is required.")
        .bail()
        .isEmail().withMessage("Invalid email address.")
        .normalizeEmail(),
    // AGE
    (0, express_validator_1.body)("age")
        .exists().withMessage("Age required.")
        .bail()
        .isNumeric(),
    // Password
    (0, express_validator_1.body)("password")
        .optional()
        .isString().withMessage("Password must be a string.")
        .trim()
        .blacklist("<>")
        .isLength({ min: 8, max: 50 }).withMessage("Password must be between 8 and 50 characters long.")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage("Password must contain at least one letter, one number, and one special character."),
    // Middleware to handle validation result
    // Middleware to handle validation result
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware if validation passes
    },
];
