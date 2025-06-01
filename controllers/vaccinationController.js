const User = require("../models/User");

exports.addVaccination = async (req, res) => {
  try {
    const { babyId } = req.params;
    const { name, lastVaccinationDate, nextDueDate } = req.body;

    const user = await User.findOne({ _id: req.user._id, "parentDetails.babies._id": babyId });

    if (!user) return res.status(404).json({ message: "Baby not found" });

    const baby = user.parentDetails.babies.id(babyId);
    baby.vaccinations.push({ name, lastVaccinationDate, nextDueDate });

    await user.save();
    res.status(201).json({ message: "Vaccination added successfully", baby });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateVaccinationStatus = async (req, res) => {
  try {
    const { babyId, vaccinationId } = req.params;
    const { status } = req.body;

    const user = await User.findOne({ _id: req.user._id, "parentDetails.babies._id": babyId });

    if (!user) return res.status(404).json({ message: "Baby not found" });

    const baby = user.parentDetails.babies.id(babyId);
    const vaccination = baby.vaccinations.id(vaccinationId);

    if (!vaccination) return res.status(404).json({ message: "Vaccination not found" });

    vaccination.status = status;

    await user.save();
    res.status(200).json({ message: "Vaccination status updated successfully", baby });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getBabyVaccinations = async (req, res) => {
  try {
    const { babyId } = req.params;

    const user = await User.findOne({ _id: req.user._id, "parentDetails.babies._id": babyId });

    if (!user) return res.status(404).json({ message: "Baby not found" });

    const baby = user.parentDetails.babies.id(babyId);

    res.status(200).json({ vaccinations: baby.vaccinations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteVaccination = async (req, res) => {
    try {
      const { babyId, vaccinationId } = req.params;
      
      const user = await User.findOne({ "parentDetails.babies._id": babyId });
      if (!user) {
        return res.status(404).json({ message: "Baby not found" });
      }
  
      const baby = user.parentDetails.babies.id(babyId);
      if (!baby) {
        return res.status(404).json({ message: "Baby not found" });
      }
  
      const vaccinationIndex = baby.vaccinations.findIndex(v => v._id.toString() === vaccinationId);
      if (vaccinationIndex === -1) {
        return res.status(404).json({ message: "Vaccination not found" });
      }
  
      baby.vaccinations.splice(vaccinationIndex, 1);
      await user.save();
  
      res.status(200).json({ message: "Vaccination deleted successfully", baby });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
