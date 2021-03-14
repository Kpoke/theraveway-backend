const Comment = require("../model/comment");

module.exports = async post => {
  const comments = await Comment.find({ post })
    .populate({
      path: "author",
      select: "username"
    })
    .sort({ createdAt: "descending" });
  return comments;
};
