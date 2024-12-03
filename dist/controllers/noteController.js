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
exports.getNotes = exports.deleteNote = exports.updatedNote = exports.createNote = void 0;
const note_model_1 = require("../models/note.model");
const user_model_1 = require("../models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const userId = req.userId;
        const createdBy = yield user_model_1.User.findById(userId);
        const newNote = note_model_1.Note.build({
            title,
            description,
            // Id of the CurrentUser loggedIn for auth & 2
            author: new mongoose_1.default.Types.ObjectId(userId)
        });
        const savedNote = yield newNote.save();
        res.status(200).json({ newNote: savedNote, message: "Created new note" });
    }
    catch (err) {
        console.log("Error in CreateNote Controller", err);
        res.status(500).json({ error: "Internal server error", err });
    }
});
exports.createNote = createNote;
const updatedNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: noteId } = req.params;
        const { title, description } = req.body;
        // For updating note, you must have created the same Note
        const currUserId = req.userId;
        const authorId = yield note_model_1.Note.findOne({ _id: noteId }).select('-_id author');
        if (currUserId !== (authorId === null || authorId === void 0 ? void 0 : authorId.author.toString())) {
            // you can't update
            res.status(401).json({ message: "Note doesn't belong to you, Can't update" });
            return;
        }
        const updatedNote = yield note_model_1.Note.updateOne({ _id: noteId }, {
            title: title,
            description: description
        });
        res.status(200).json({ message: "Note has been updated", updatedNote });
    }
    catch (err) {
        console.log("Error inside UpdateNote Controller", err);
        res.status(500).json({ message: "Internal server error in UpdateNote controller" });
    }
});
exports.updatedNote = updatedNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: noteId } = req.params;
        // For deleting note, you must have created the same Note
        const currUserId = req.userId;
        const authorId = yield note_model_1.Note.findOne({ _id: noteId }).select('-_id author');
        if (currUserId !== (authorId === null || authorId === void 0 ? void 0 : authorId.author.toString())) {
            // you can't delete
            res.status(401).json({ message: "Note doesn't belong to you, Can't delete" });
            return;
        }
        const deleteNote = yield note_model_1.Note.findByIdAndUpdate(noteId);
        res.status(200).json({ message: "Note has been delete", deleteNote });
    }
    catch (err) {
        console.log("Error inside DeleteNote Controller", err);
        res.status(500).json({ message: "Internal server error in DeleteNote controller" });
    }
});
exports.deleteNote = deleteNote;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const allNotes = yield note_model_1.Note.find({ author: userId });
        res.status(200).json({ message: "Fetched all notes", allNotes });
    }
    catch (err) {
        console.log("Error inside getNotes Controller", err);
        res.status(500).json({ message: "Internal server error in getNotes controller" });
    }
});
exports.getNotes = getNotes;
