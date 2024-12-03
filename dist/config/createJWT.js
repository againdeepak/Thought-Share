"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWTtoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET;
const generateJWTtoken = (payload) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, SECRET, {
            expiresIn: "2h"
        });
        return token;
    }
    catch (err) {
        console.log("Error while generating jwt token ", err);
        throw err;
    }
};
exports.generateJWTtoken = generateJWTtoken;
