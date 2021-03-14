const Post = require("../model/post");
const Comment = require("../model/comment");

const createComment = async (comment, user, postId) => {
	const post = await Post.findById(postId);
	if (!post) {
		throw new Error("Post not found");
	}
	const newComment = new Comment({ comment, author: user._id, post: post._id });
	newComment.save();
	let modifiedComment = await newComment
		.populate("author", "username")
		.execPopulate();
	return modifiedComment;
};

module.exports = createComment;
