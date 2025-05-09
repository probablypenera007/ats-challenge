import mongoose, { Schema } from "mongoose";

const InterviewSessionSchema = new Schema({
  jobDescription: String,
  cvText: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.InterviewSession ||
  mongoose.model("InterviewSession", InterviewSessionSchema);
