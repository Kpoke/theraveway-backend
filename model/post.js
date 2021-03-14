const mongoose = require("mongoose");

var postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
    },
    trending: { type: Boolean, default: true },
    imageUrl: String,
    views: {
      type: Number,
      default: 0,
    },
    textareas: {
      type: Array,
      default: [],
    },
    media_build_ids: {
      type: Array,
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
