// models/DoctorRequest.js
const mongoose = require("mongoose");


const doctorRequestSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  babyName: String,
  age: Number,
  weight: Number,
  height: Number,
  dietaryConcerns: String,
  preferredFood: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DoctorRequest", doctorRequestSchema);
