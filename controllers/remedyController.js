const Remedy = require("../models/Remedy");

exports.addRemedy = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "parent") {
      return res.status(403).json({ message: "Only parents can add remedies" });
    }

    const images = req.files.map((file) => `/uploads/${file.filename}`);
    const { caption } = req.body;

    if (!caption || images.length === 0) {
      return res.status(400).json({ message: "Caption and at least one image are required" });
    }

    const newRemedy = new Remedy({
      parentId: req.user._id,
      images,
      caption,
    });

    await newRemedy.save();

    res.status(201).json({ message: "Remedy added successfully", remedy: newRemedy });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllRemedies = async (req, res) => {
  try {
    const remedies = await Remedy.find().populate("parentId", "fullName profilePhoto");

    res.status(200).json(remedies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteRemedy = async (req, res) => {
    try {
      const { remedyId } = req.params;
  
      const remedy = await Remedy.findById(remedyId);
      if (!remedy) {
        return res.status(404).json({ message: "Remedy not found" });
      }
  
      // Check if the logged-in user is the owner of the remedy
      if (req.user.role !== "parent" || remedy.parentId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to delete this remedy" });
      }
  
      await Remedy.findByIdAndDelete(remedyId);
      res.status(200).json({ message: "Remedy deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
