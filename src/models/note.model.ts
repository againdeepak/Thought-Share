import mongoose from "mongoose";

interface NoteAttrs {
    title: String;
    description: String;
    author: mongoose.Types.ObjectId;
}

interface NoteDoc extends mongoose.Document {
    id: String;
    title: String;
    description: String;
    author: mongoose.Types.ObjectId;
    createdAt: String;
    updatedAt: String;
    version: String;
}

interface NoteModel extends mongoose.Model<NoteDoc> {
    build(attrs: NoteAttrs): NoteDoc;
}


const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        author: { type: mongoose.Types.ObjectId, ref:"User" }
    },
    {
        timestamps:true,
        versionKey:false,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
)

noteSchema.set("versionKey", "version");

noteSchema.pre("save", function (done) {
    done();
});

noteSchema.statics.build = (attrs: NoteAttrs) => {
    return new Note(attrs);
};

const Note = mongoose.model<NoteDoc, NoteModel>("Note", noteSchema);

export { Note };