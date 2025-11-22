
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  venue: String
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export { Event };
