const Post = require("../model/post");

const getPosts = async postId => {
  let post = await Post.findByIdAndUpdate({ _id: postId }, { trending: false });

  if (post) {
    return post;
  }
  return false;
};

module.exports = getPosts;
