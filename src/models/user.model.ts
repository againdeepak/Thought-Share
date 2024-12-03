import mongoose from "mongoose";

interface UserAttrs {
    userName: string;
    email: string;
    age: number;
    password: string;
}

interface UserDoc extends mongoose.Document {
    id: string;
    userName: string;
    email: string;
    age: number;
    password: string;
    createdAt: string;
    updatedAt: string;
    version: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
    {
        id: {type:String},
        userName: { type: String, required: true },
        email: { type: String, required: true },
        age: { type: Number, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
        versionKey: false, // Disables the default `__v` key]
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

userSchema.set("versionKey", "version");

userSchema.pre("save", function (done) {
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
