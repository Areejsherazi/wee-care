const express = require("express");
const { addRemedy, getAllRemedies ,deleteRemedy} = require("../controllers/remedyController");
const upload = require("../middlewares/upload");
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add",protect, upload.array("images", 5), addRemedy);
router.get("/all", getAllRemedies);
router.delete("/delete/:remedyId", protect, deleteRemedy);


module.exports = router;
