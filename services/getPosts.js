const Post = require("../model/post");

const getPosts = async (query) => {
  const { trending, tag, limit, skip } = query;
  let findObject = {};
  if (trending !== undefined) {
    findObject["trending"] = trending;
  }
  if (tag !== undefined) {
    findObject["tag"] = tag;
  }
  let length = await Post.countDocuments(findObject);
  let posts = await Post.find(findObject)
    .sort({ createdAt: "descending" })
    .limit(parseInt(limit))
    .skip(parseInt(skip));

  return { posts, length };
};

module.exports = getPosts;
