import { Request, Response } from "express";
import { Note } from "../models/note.model";
import { User } from "../models/user.model";
import mongoose from "mongoose";

interface noteRequest extends Request {
    body: {
        title: String;
        description: String;
    },
    userId?: string;
}

export const createNote = async (req: noteRequest, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.userId;
        const createdBy = await User.findById(userId);
        const newNote = Note.build({
            title,
            description,
            // Id of the CurrentUser loggedIn for auth & 2
            author:new mongoose.Types.ObjectId(userId)
        })
        const savedNote = await newNote.save();
        res.status(200).json({ newNote: savedNote, message: "Created new note" });
    } catch (err) {
        console.log("Error in CreateNote Controller", err);
        res.status(500).json({ error: "Internal server error", err });
    }
}

interface updateNoteRequest extends Request{
    body:{
        title: string;
        description: string;
    },
    params:{
        id: string;
    }
}
export const updatedNote =async (req: updateNoteRequest, res: Response): Promise<void> => {
    try {
        const { id: noteId } = req.params;
        const { title, description } = req.body;
        // For updating note, you must have created the same Note
        const currUserId = req.userId;
        const authorId = await Note.findOne({_id: noteId}).select('-_id author');
        if(currUserId !== authorId?.author.toString()){
            // you can't update
            res.status(401).json({message:"Note doesn't belong to you, Can't update"});
            return;
        }
        const updatedNote = await Note.updateOne({_id: noteId},{
            title: title,
            description: description
        })
        res.status(200).json({message:"Note has been updated",updatedNote})
    } catch (err) {
        console.log("Error inside UpdateNote Controller", err);
        res.status(500).json({ message: "Internal server error in UpdateNote controller" });
    }
}

interface deleteNoteRequest extends Request{
    params:{
        id: string;
    }
}
export const deleteNote = async (req: deleteNoteRequest, res: Response):Promise<void> =>{
    try{
        const {id: noteId } = req.params;
        // For deleting note, you must have created the same Note
        const currUserId = req.userId;
        const authorId = await Note.findOne({_id: noteId}).select('-_id author');
        if(currUserId !== authorId?.author.toString()){
            // you can't delete
            res.status(401).json({message:"Note doesn't belong to you, Can't delete"});
            return;
        }
        const deleteNote = await Note.findByIdAndUpdate(noteId);
        res.status(200).json({message:"Note has been delete",deleteNote});

    }catch(err){
        console.log("Error inside DeleteNote Controller", err);
        res.status(500).json({ message: "Internal server error in DeleteNote controller" });
    }
}

export const getNotes = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const allNotes = await Note.find({ author: userId });
        res.status(200).json({ message: "Fetched all notes", allNotes });
    } catch (err) {
        console.log("Error inside getNotes Controller", err);
        res.status(500).json({ message: "Internal server error in getNotes controller" });
    }
}