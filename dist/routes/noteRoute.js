"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const noteController_1 = require("../controllers/noteController");
const protectUser_1 = require("../middleware/protectUser");
const noteValidation_1 = require("../validation/noteValidation");
router.post('/create/note', protectUser_1.protectedUser, noteValidation_1.noteValidation, noteController_1.createNote)
    .put('/note/:id/update', protectUser_1.protectedUser, noteValidation_1.noteValidation, noteController_1.updatedNote)
    .delete('/note/:id/delete', protectUser_1.protectedUser, noteController_1.deleteNote)
    .get('/notes', protectUser_1.protectedUser, noteController_1.getNotes);
exports.default = router;
