"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET;
const protectedUser = (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.usertoken;
        if (!token) {
            res.status(401).json({ error: "Token not provided" });
            return;
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        if (!decoded) {
            res.status(401).json({ error: "Not a valid token provided" });
            return;
        }
        const { userId } = decoded;
        // Attach userId to request
        req.userId = userId;
        next();
    }
    catch (err) {
        console.error("Error in verifyTokenFromCookie middleware:", err);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
exports.protectedUser = protectedUser;
