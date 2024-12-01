import express, { Router } from 'express';
import { deleteImagefromCloudinary } from '../controller/cloudinary.controller';

const router: Router = express.Router();

router.post('/image/delete',deleteImagefromCloudinary);

export default router;

