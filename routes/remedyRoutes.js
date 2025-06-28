const express = require("express");
const { addRemedy, getAllRemedies ,deleteRemedy,likeRemedy, dislikeRemedy} = require("../controllers/remedyController");
const upload = require("../middlewares/upload");
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add",protect, upload.array("images", 5), addRemedy);
router.get("/all", getAllRemedies);
router.delete("/delete/:remedyId", protect, deleteRemedy);
router.post("/like/:remedyId", protect, likeRemedy);
router.post("/dislike/:remedyId", protect, dislikeRemedy);

module.exports = router;
