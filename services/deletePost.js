const Post = require("../model/post");
const Comment = require("../model/comment");
const cloudinary = require("cloudinary").v2;

module.exports = async (postId) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const post = await Post.findById({ _id: postId });
  const { result } = await cloudinary.uploader.destroy(post.imagePublicId);
  if (!result) {
    throw new Error("An Error Occured, Try Again");
  }
  if (result === "ok") {
    await Post.findByIdAndDelete({ _id: postId });
    await Comment.deleteMany({ post: postId });
  }
};
