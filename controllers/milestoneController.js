const Milestone = require("../models/Milestone");

exports.addMilestone = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "parent") {
      return res.status(403).json({ message: "Only parents can add milestones" });
    }

    const { babyId, milestoneName, description, achievementDate } = req.body;

    const newMilestone = new Milestone({
      babyId,
      milestoneName,
      description,
      achievementDate: achievementDate || null
    });

    await newMilestone.save();

    res.status(201).json({ message: "Milestone added successfully", milestone: newMilestone });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getMilestones = async (req, res) => {
  try {
    const { babyId } = req.params;
    const milestones = await Milestone.find({ babyId });

    if (!milestones.length) {
      return res.status(404).json({ message: "No milestones found for this baby" });
    }

    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.editMilestone = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const { milestoneName, description, isOngoing, achievementDate } = req.body;

    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // Only parent who created the milestone can update
    if (req.user.role !== "parent") {
      return res.status(403).json({ message: "Not authorized to edit this milestone" });
    }

    // Update milestone
    milestone.milestoneName = milestoneName || milestone.milestoneName;
    milestone.description = description || milestone.description;
    milestone.isOngoing = isOngoing !== undefined ? isOngoing : milestone.isOngoing;
    milestone.achievementDate = achievementDate || milestone.achievementDate;
    milestone.status = milestone.isOngoing ? "pending" : "completed";

    await milestone.save();
    res.status(200).json({ message: "Milestone updated successfully", milestone });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteMilestone = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const milestone = await Milestone.findById(milestoneId);

    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // Only parent who created the milestone can delete
    if (req.user.role !== "parent") {
      return res.status(403).json({ message: "Not authorized to delete this milestone" });
    }

    await Milestone.findByIdAndDelete(milestoneId);
    res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
