import mongoose from "mongoose";
let Schema = mongoose.Schema;

let bug = new Schema(
  {
    closed: { type: Boolean, default: false },
    description: { type: String, required: true },
    title: { type: String, required: true, maxlength: 50, trim: true },
    reportedBy: { type: String, required: true, maxlength: 10000, trim: true }, //The provided name for who reported the bug
    createdDate: Date,
    closedDate: Date
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default bug;
