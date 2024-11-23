import mongoose, { Document, Model, Schema } from "mongoose";

// Define an interface for the User documents
interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  userPic: string;
  posts: mongoose.Types.ObjectId[];
}

// Define the schema using the IUser interface
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userPic:{
      type:String,
      default:"https://res.cloudinary.com/dxwcmq53m/image/upload/v1731397366/UploadPic_uhmgsf.png"
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "postModel", // Make sure this matches the name of your post model
      },
    ],
  },
  { timestamps: true }
);

// Define the userModel type
const userModel: Model<IUser> = mongoose.model<IUser>("userModel", userSchema);
export default userModel;
