const Post = require("../model/post");
const Hit = require("../model/hit");

module.exports = async (title, ip) => {
  let newVisitor = false;
  const post = await Post.findOne({ title }).populate("author", "username");
  const hits = await Hit.findOne({ post: post._id, ip });
  if (!hits) {
    const newHit = new Hit({
      post: post._id,
      ip,
    });
    newHit.save();
    newVisitor = true;
  }
  if (newVisitor === true) {
    post.views += 1;
    post.save();
  }
  return post;
};
