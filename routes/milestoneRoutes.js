const express = require("express");
const {
  addMilestone,
  getMilestones,
  editMilestone,
  deleteMilestone,
} = require("../controllers/milestoneController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", protect, addMilestone); // Add Milestone
router.get("/baby/:babyId", protect, getMilestones); // Get all milestones for a baby
router.put("/edit/:milestoneId", protect, editMilestone); // Edit Milestone
router.delete("/delete/:milestoneId", protect, deleteMilestone); // Delete Milestone

module.exports = router;
