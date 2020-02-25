import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let note = new Schema(
  {
    content: String,
    bugId: { type: ObjectId, ref: "Bug", required: true },
    reportedBy: String //The provided name for who made the note
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default note;
