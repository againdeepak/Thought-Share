import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
interface deleteImageRequest extends Request{
    body:{
        publicId: string;
    }
}

export const deleteImagefromCloudinary = async  (req: deleteImageRequest, res:Response): Promise<any> =>{
    const {publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "Public ID is required" });
    }
  
    try {
        console.log(publicId);
      const result = await cloudinary.uploader.destroy(publicId);
      return res.status(200).json({ message: "Image deleted successfully", result });
    } catch (error) {
      console.error("Error deleting image:", error);
      return res.status(500).json({ error: "Failed to delete image" });
    }
}