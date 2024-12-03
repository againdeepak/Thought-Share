"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteValidation = void 0;
const express_validator_1 = require("express-validator");
exports.noteValidation = [
    // Title
    (0, express_validator_1.body)("title")
        .exists().withMessage("Title must be required")
        .bail()
        .isLength({ min: 5, max: 15 }).withMessage("Title must be between 5 to 15 characters"),
    // Description
    (0, express_validator_1.body)("description")
        .exists().withMessage("Description is required.")
        .bail()
        .isLength({ min: 15, max: 200 }).withMessage("You have to write description with atleast 15 characters and max 200 characters"),
    // Middleware to handle validation result
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware if validation passes
    },
];
