import mongoose, { Schema } from "mongoose";
import ResponseSchema from "./response";
import ScoreBreakdownSchema from "./scoreBreakdown";

const InterviewSessionSchema = new Schema({
  jobDescription: String,
  cvText: String,
  responses: [ResponseSchema],
  score: ScoreBreakdownSchema,
  startedAt: Date,
  endedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.InterviewSession ||
  mongoose.model("InterviewSession", InterviewSessionSchema);