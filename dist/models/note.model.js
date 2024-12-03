"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose_1.default.Types.ObjectId, ref: "User" }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
noteSchema.set("versionKey", "version");
noteSchema.pre("save", function (done) {
    done();
});
noteSchema.statics.build = (attrs) => {
    return new Note(attrs);
};
const Note = mongoose_1.default.model("Note", noteSchema);
exports.Note = Note;
