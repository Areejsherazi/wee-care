const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // import multer config
const { chatWithBot } = require("../controllers/chatbotController");

// Use upload.single for image field
router.post("/ask", upload.single("image"), chatWithBot);

module.exports = router;
