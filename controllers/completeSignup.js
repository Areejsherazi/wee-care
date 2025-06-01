const User = require("../models/User");

// Complete Signup for Doctor
exports.completeDoctorSignup = async (req, res) => {
  try {
    const { userId, qualification, specialization, licenseNumber, clinicHospitalName, phoneNumber } = req.body;

    let user = await User.findById(userId);
    if (!user || user.role !== "doctor") return res.status(400).json({ message: "Invalid doctor account" });

    user.doctorDetails = { qualification, specialization, licenseNumber, clinicHospitalName, phoneNumber };
    user.isSignupComplete = true;
    await user.save();

    res.status(200).json({ message: "Doctor signup completed", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Complete Signup for Parent with Baby Photo
exports.completeParentSignup = async (req, res) => {
    try {
      const { userId, babyName, dob, weight, height, gender } = req.body;
      const profilePhoto = req.file ? `/uploads/${req.file.filename}` : null; // Store file path
  
      let user = await User.findById(userId);
      if (!user || user.role !== "parent") return res.status(400).json({ message: "Invalid parent account" });
  
      const baby = { name: babyName, dob, weight, height, gender, profilePhoto };
      if (!user.parentDetails) user.parentDetails = { babies: [] };
      user.parentDetails.babies.push(baby);
      user.isSignupComplete = true;
      await user.save();
  
      res.status(200).json({ message: "Parent signup completed", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };