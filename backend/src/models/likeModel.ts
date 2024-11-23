import mongoose, { Document, Schema } from "mongoose";

interface ILike extends Document {
    likeStatus: boolean;
    likeBy: mongoose.Types.ObjectId;  // Corrected here
}

const likeSchema = new Schema<ILike>({
    likeStatus: {
        type: Boolean,
        default: true,
    },
    likeBy: {
        type: Schema.Types.ObjectId,
        ref: "userModel",
    }
}, { timestamps: true });

const likeModel = mongoose.model<ILike>("likeModel", likeSchema);
export default likeModel;
