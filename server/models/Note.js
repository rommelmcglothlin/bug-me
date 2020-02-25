import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let note = new Schema(
  {
    content: { type: String, maxlength: 10000, required: true },
    bugId: { type: ObjectId, ref: "Bug" },
    reportedBy: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default note;
