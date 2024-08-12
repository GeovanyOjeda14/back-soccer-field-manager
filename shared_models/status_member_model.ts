const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  registerBy: { type: String, enum: ["form", "google"], default: "form" },
  isProfileComplete: { type: Boolean, default: false }
}, { _id: false });

export { statusSchema };