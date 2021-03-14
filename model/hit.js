const mongoose = require("mongoose");

var hitSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  ip: String,
});

module.exports = mongoose.model("Hit", hitSchema);
