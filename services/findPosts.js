const Post = require("../model/post");

module.exports = async (title) => {
  const posts = await Post.find({
    title: { $regex: title, $options: "i" },
  }).populate("author", "username");
  return posts;
};
