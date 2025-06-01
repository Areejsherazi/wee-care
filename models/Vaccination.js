const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastVaccinationDate: { type: Date, required: true },
  nextDueDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

module.exports = mongoose.model("Vaccination", vaccinationSchema);
