"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET;
const generateToken = (payload) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: '1h' });
        return token;
    }
    catch (err) {
        console.log("Error while generating token");
        throw err;
    }
};
exports.generateToken = generateToken;
