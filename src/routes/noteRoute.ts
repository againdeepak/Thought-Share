import express from 'express';
const router = express.Router();
import { createNote, deleteNote, getNotes, updatedNote } from '../controllers/noteController';
import { protectedUser } from '../middleware/protectUser';
import { noteValidation } from '../validation/noteValidation';
router.post('/create/note', protectedUser, noteValidation, createNote)
    .put('/note/:id/update', protectedUser,noteValidation, updatedNote)
    .delete('/note/:id/delete', protectedUser, deleteNote)
    .get('/notes', protectedUser, getNotes);

export default router;