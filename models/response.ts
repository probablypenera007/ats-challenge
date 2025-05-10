import { Schema } from "mongoose";

const ResponseSchema = new Schema({
  question: String,
  answer: String,
  responseTime: Number,
  timestamp: { type: Date, default: Date.now },
}, { _id: false });

export default ResponseSchema;