import { Schema } from "mongoose";

const ScoreBreakdownSchema = new Schema({
  technical: Number,
  communication: Number,
  responsiveness: Number,
  problemSolving: Number,
  culturalFit: Number,
  averageScore: Number,
  summary: String,
}, { _id: false }); 

export default ScoreBreakdownSchema;