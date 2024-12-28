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
exports.updateUserProfilePic = exports.userInformation = exports.userLogout = exports.userLogin = exports.userSignUp = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../config/generateToken");
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        // check for empty field
        if (!userName || !email || !password) {
            return res.status(401).json({ error: "Please, fill the required field" });
        }
        // check for password must be >= 6 chars
        if (password.length < 6) {
            return res.status(401).json({
                error: "Password must be at least 6 characters"
            });
        }
        // check for the Email (USER), Already exists...
        const existsUser = yield userModel_1.default.findOne({ email });
        if (existsUser) {
            return res.status(401).json({
                error: "User already exists"
            });
        }
        else {
            // hash the password before storing it...
            const saltRound = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, saltRound);
            const newUser = new userModel_1.default({
                userName, email, password: hashedPassword
            });
            const response = yield newUser.save();
            const payload = {
                userId: response._id
            };
            // Generate Token
            const token = (0, generateToken_1.generateToken)(payload);
            // Set inside the cookie
            res.cookie('usertoken', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000
            });
            return res.status(200).json({ message: "User signup successfully!", response, token });
        }
    }
    catch (err) {
        console.error("Error in userSignUp controller", err);
        return res.status(500).json({ error: "Error in userSignUp controller", err });
    }
});
exports.userSignUp = userSignUp;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ error: "Please, fill all the required field" });
        }
        // Check if User is register or not...
        const userExists = yield userModel_1.default.findOne({ email });
        if (!userExists) {
            return res.status(401).json({ error: "No user found" });
        }
        else {
            // Check for the password
            const matchPassword = yield bcryptjs_1.default.compare(password, userExists.password);
            if (!matchPassword) {
                return res.status(401).json({ error: "Password incorrect" });
            }
        }
        const payload = {
            userId: userExists._id
        };
        // Generate Token
        const token = (0, generateToken_1.generateToken)(payload);
        // Set inside the cookie
        res.cookie('usertoken', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        });
        return res.status(200).json({ message: "User login successfully!", userExists, token });
    }
    catch (err) {
        console.error("Error in userLogin controller", err);
        return res.status(500).json({ error: "Error in userLogin controller", err });
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
const userInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield userModel_1.default.findById(req.userId);
        return res.status(200).json({ userInfo });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.userInformation = userInformation;
const updateUserProfilePic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.params;
        const { photo } = req.body;
        const response = yield userModel_1.default.findByIdAndUpdate(userId, { userPic: photo }, { new: true });
        return res.status(200).json({ message: "Updated profile picture", response });
    }
    catch (err) {
        console.log("error in updateUserProfilePic controller");
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateUserProfilePic = updateUserProfilePic;
