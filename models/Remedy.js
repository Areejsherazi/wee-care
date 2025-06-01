const mongoose = require("mongoose");

const RemedySchema = new mongoose.Schema(
  {
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    images: [{ type: String, required: true }], // Array of image URLs
    caption: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Remedy", RemedySchema);
