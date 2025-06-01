const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  babyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  milestoneName: { type: String, required: true },
  description: { type: String, required: true },
  isOngoing: { type: Boolean, default: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  achievementDate: { type: Date, default: null }
});

// Automatically update status based on achievementDate
milestoneSchema.pre("save", function (next) {
  this.status = this.achievementDate ? "completed" : "pending";
  next();
});

module.exports = mongoose.model("Milestone", milestoneSchema);
