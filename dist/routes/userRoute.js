"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const userValidation_1 = require("../validation/userValidation");
router.post('/signup', userValidation_1.userValidation, userController_1.userSignUp)
    .post('/login', userController_1.userLogin)
    .post('/logout', userController_1.userLogout);
exports.default = router;
