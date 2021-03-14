const mongoose = require("mongoose");

var gallerySchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      trim: true,
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
    galleryPost: {
      type: Boolean,
      default: true,
    },
    build_id: {
      type: String,
    },
    imagePublicId: String,
    imageUrl: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
