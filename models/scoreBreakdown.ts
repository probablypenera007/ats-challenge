import { Schema } from "mongoose";

const ScoreBreakdownSchema = new Schema({
  technical: Number,
  communication: Number,
  responsiveness: Number,
  problemSolving: Number,
  culturalFit: Number,
  averageScore: Number,
  summary: String,
}, { _id: false }); // prevents Mongo from generating an _id for this embedded schema

export default ScoreBreakdownSchema;