const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addVaccination, updateVaccinationStatus, getBabyVaccinations ,deleteVaccination} = require("../controllers/vaccinationController");

const router = express.Router();

router.post("/add/:babyId", protect, addVaccination);
router.put("/update/:babyId/:vaccinationId", protect, updateVaccinationStatus);
router.get("/all/:babyId", protect, getBabyVaccinations);
router.delete("/delete/:babyId/:vaccinationId", protect, deleteVaccination);


module.exports = router;
