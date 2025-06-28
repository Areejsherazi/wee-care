const express = require("express");
const { signup,getAllDoctors } = require("../controllers/authController");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/authMiddleware");
const {completeDoctorSignup,completeParentSignup}=require("../controllers/completeSignup");
const { login } = require("../controllers/login");


const router = express.Router();

router.post("/signup", upload.single("profilePhoto"), signup);
router.post("/complete-doctor-signup",protect, completeDoctorSignup);
router.post("/complete-parent-signup",upload.single("profilePhoto"), completeParentSignup);
router.post("/login", login);
router.get("/get-all-doctors",getAllDoctors);




module.exports = router;
