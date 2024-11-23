import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the comment document
interface IComment extends Document {
    comment: string;
    commentBy: mongoose.Types.ObjectId;
}

// Define the comment schema with type annotations and correct validation
const commentSchema: Schema<IComment> = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: [true, "Comment is required"],
            minlength: [5, "Please put something meaningful in the comment"],
        },
        commentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel",
            required: true, // Specify required if applicable
        },
    },
    { timestamps: true }
);

// Create and export the model
const commentModel = mongoose.model<IComment>("commentModel", commentSchema);
export default commentModel;
