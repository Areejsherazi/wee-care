const mongoose = require("mongoose");
const vaccinationSchema = require("./Vaccination").schema; // Import vaccination schema

const babySchema = new mongoose.Schema({
  name: String,
  dob: Date,
  weight: Number,
  height: Number,
  gender: String,
  profilePhoto: String,
  vaccinations: [vaccinationSchema], // Reference vaccination schema

});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["doctor", "parent"], required: true },
    profilePhoto: { type: String },
    isSignupComplete: { type: Boolean, default: false },
    doctorDetails: {
      qualification: String,
      specialization: String,
      licenseNumber: String,
      clinicHospitalName: String,
      phoneNumber: String,
    },
    parentDetails: {
      babies: [babySchema], // Array of babies
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
