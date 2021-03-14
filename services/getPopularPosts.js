const Post = require("../model/post");

const getPopularPosts = async () => {
  let posts = await Post.find()
    .sort({ views: "descending" })
    .limit(parseInt(10));

  return posts;
};

module.exports = getPopularPosts;
