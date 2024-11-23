"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET;
const protectedUser = (req, res, next) => {
    try {
        const token = req.cookies.usertoken;
        if (!token) {
            res.status(401).json({ error: "Token not provided" });
            return;
        }
        const validToken = jsonwebtoken_1.default.verify(token, SECRET);
        if (!validToken) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }
        const { userId } = validToken;
        req.userId = userId;
        next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ error: "Token expired" });
            return;
        }
        console.error("Error in protectedUser middleware:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
exports.protectedUser = protectedUser;
