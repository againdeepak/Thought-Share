import mongoose, { Document, Schema } from 'mongoose';

// Interface for schema

interface IPost extends Document {
    photo: string;
    description: string;
    location: string;
    postBy:mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
}
const postSchema = new Schema<IPost>({
    photo: {
        type: String,
        default: "Photo"
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    postBy: { //Referring to the currentUser
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true,
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "likeModel"
        }
    ],
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "commentModel"
        }
    ],
}, { timestamps: true }); // Automatically added, updated time and create time...

const postModel = mongoose.model<IPost>("postModel", postSchema);
export default postModel;

