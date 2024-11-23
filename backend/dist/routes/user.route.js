"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const post_controller_1 = require("../controller/post.controller");
const protectedUser_1 = require("../middleware/protectedUser");
const router = express_1.default.Router();
router.post('/signup', user_controller_1.userSignUp);
router.post('/login', user_controller_1.userLogin);
router.post('/create/post', protectedUser_1.protectedUser, post_controller_1.createPost);
exports.default = router;
