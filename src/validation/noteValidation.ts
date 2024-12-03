import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";

export const noteValidation = [
    // Title
    body("title")
        .exists().withMessage("Title must be required")
        .bail()
        .isLength({min:5,max:15}).withMessage("Title must be between 5 to 15 characters"),

    // Description
    body("description")
        .exists().withMessage("Description is required.")
        .bail()
        .isLength({min:15,max:200}).withMessage("You have to write description with atleast 15 characters and max 200 characters"),

    // Middleware to handle validation result
    (req: Request, res: Response, next: NextFunction):any => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            
        }
        next(); // Proceed to the next middleware if validation passes
    },
];