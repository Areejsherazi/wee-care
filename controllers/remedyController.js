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
    const userId = req.user?._id; // may be undefined for public users

    const remedies = await Remedy.find()
      .populate("parentId", "fullName profilePhoto")
      .lean(); // lean to work with plain JS objects

    const updatedRemedies = remedies.map((remedy) => {
      const likeCount = remedy.likes?.length || 0;
      const dislikeCount = remedy.dislikes?.length || 0;
      const userLiked = userId ? remedy.likes.some(id => id.toString() === userId.toString()) : false;
      const userDisliked = userId ? remedy.dislikes.some(id => id.toString() === userId.toString()) : false;

      return {
        ...remedy,
        likeCount,
        dislikeCount,
        userLiked,
        userDisliked,
      };
    });

    res.status(200).json(updatedRemedies);
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
  
exports.likeRemedy = async (req, res) => {
  try {
    const { remedyId } = req.params;
    const userId = req.user._id;

    const remedy = await Remedy.findById(remedyId);
    if (!remedy) return res.status(404).json({ message: "Remedy not found" });

    // Remove user from dislikes if exists
    remedy.dislikes = remedy.dislikes.filter(id => id.toString() !== userId.toString());

    // Toggle like
    if (remedy.likes.includes(userId)) {
      remedy.likes.pull(userId);
    } else {
      remedy.likes.push(userId);
    }

    await remedy.save();
    res.status(200).json({ message: "Like updated", likes: remedy.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.dislikeRemedy = async (req, res) => {
  try {
    const { remedyId } = req.params;
    const userId = req.user._id;

    const remedy = await Remedy.findById(remedyId);
    if (!remedy) return res.status(404).json({ message: "Remedy not found" });

    // Remove user from likes if exists
    remedy.likes = remedy.likes.filter(id => id.toString() !== userId.toString());

    // Toggle dislike
    if (remedy.dislikes.includes(userId)) {
      remedy.dislikes.pull(userId);
    } else {
      remedy.dislikes.push(userId);
    }

    await remedy.save();
    res.status(200).json({ message: "Dislike updated", dislikes: remedy.dislikes.length });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
