import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";

export const userValidation = [
    // First Name
    body("userName")
        .exists().withMessage("First Name is required.")
        .bail()
        .isString().withMessage("First Name must be a valid string."),

    // Email
    body("email")
        .exists().withMessage("Email is required.")
        .bail()
        .isEmail().withMessage("Invalid email address.")
        .normalizeEmail(),

    // AGE
    body("age")
        .exists().withMessage("Age required.")
        .bail()
        .isNumeric(),

    // Password
    body("password")
        .optional()
        .isString().withMessage("Password must be a string.")
        .trim()
        .blacklist("<>")
        .isLength({ min: 8, max: 50 }).withMessage("Password must be between 8 and 50 characters long.")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage("Password must contain at least one letter, one number, and one special character."),


    // Middleware to handle validation result
    // Middleware to handle validation result
    (req: Request, res: Response, next: NextFunction):any => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            
        }
        next(); // Proceed to the next middleware if validation passes
    },
];