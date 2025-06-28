const express = require("express");
const router = express.Router();
const { submitRequest, getDoctorRequests } = require("../controllers/requestController");
const {protect} = require("../middlewares/authMiddleware");


// Parent submits request to a doctor
router.post("/submit", protect,submitRequest);

// Doctor views requests received
router.get("/doctor-requests",protect, getDoctorRequests);

module.exports = router;
