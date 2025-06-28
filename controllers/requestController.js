// controllers/requestController.js
const DoctorRequest = require("../models/DoctorRequest");

exports.submitRequest = async (req, res) => {
  try {
    const {
      doctorId,
      parentId, // Get from body now
      name,
      babyName,
      age,
      weight,
      height,
      dietaryConcerns,
      preferredFood,
    } = req.body;

    const request = new DoctorRequest({
      doctorId,
      parentId,
      name,
      babyName,
      age,
      weight,
      height,
      dietaryConcerns,
      preferredFood,
    });

    await request.save();

    res.status(200).json({ message: "Request sent successfully", request });
  } catch (err) {
    res.status(500).json({ message: "Error sending request", error: err.message });
  }
};

exports.getDoctorRequests = async (req, res) => {
  try {
    const doctorId = req.query.doctorId; // Pass doctorId in query

    if (!doctorId) {
      return res.status(400).json({ message: "doctorId is required in query" });
    }

    const requests = await DoctorRequest.find({ doctorId });

    res.status(200).json({ message: "Requests fetched", requests });
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests", error: err.message });
  }
};