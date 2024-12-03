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
    const token = req.cookies.usertoken;
    try {
        if (!token) {
            console.log("Token not provided");
            res.status(400).json({ message: "Token not provided" });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, SECRET);
        if (!decode) {
            console.log("Token is not valid");
            res.status(400).json({ message: "Token is not valid" });
            return;
        }
        const { userId } = decode;
        req.userId = userId;
        next();
    }
    catch (err) {
        res.status(400).json({ message: "Internal server error" });
        return;
    }
};
exports.protectedUser = protectedUser;
