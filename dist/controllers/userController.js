"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.userLogin = exports.userSignUp = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createJWT_1 = require("../config/createJWT");
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, age, password } = req.body;
        const foundUser = yield user_model_1.User.findOne({ email: email });
        if (!email || !password || !age || !password) {
            return res.status(401).json({ message: "Fill requirements fields" });
        }
        if (foundUser) {
            return res.status(401).json({ message: "User already exists" });
        }
        else {
            // Hash the password before storing it...
            const saltRound = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRound);
            // const hashedPassword = 
            const newUser = user_model_1.User.build({
                userName,
                email,
                age,
                password: hashedPassword,
            });
            const savedUser = yield newUser.save();
            // Create JWT Token for storing informations
            const payload = {
                userId: savedUser._id
            };
            const token = (0, createJWT_1.generateJWTtoken)(payload);
            res.cookie("usertoken", token, { maxAge: 3 * 60 * 60 * 1000, httpOnly: true });
            const result = req.cookies.usertoken;
            return res.status(200).json({ newUser: savedUser, message: "SignUp Successfully" });
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.userSignUp = userSignUp;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const foundUser = yield user_model_1.User.findOne({ email });
        if (!email || !password) {
            return res.status(401).json({ message: "Fill requirements fields" });
        }
        if (!foundUser) {
            return res.status(401).json({ message: "You don't have account" });
        }
        else {
            const matchedPass = yield bcrypt_1.default.compare(password, foundUser.password);
            if (!matchedPass) {
                return res.status(401).json({ message: "Password is not correct" });
            }
            const payload = {
                userId: foundUser._id
            };
            const token = (0, createJWT_1.generateJWTtoken)(payload);
            res.cookie("usertoken", token, { maxAge: 3 * 60 * 60 * 1000, httpOnly: true });
            return res.status(200).json({ message: "Login successfully" });
        }
    }
    catch (err) {
        console.log("error in UserLoginController", err);
        return res.status(500).json({ error: "Internal server error in UserLOginController" });
    }
});
exports.userLogin = userLogin;
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('usertoken', { path: '/' }); // Clears the cookie named 'usertoken'
        res.status(200).json({ message: "Logout successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.userLogout = userLogout;
