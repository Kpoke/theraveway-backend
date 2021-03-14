const Post = require("../model/post");
const path = require("path");
const DatauriParser = require("datauri/parser");
const cloudinary = require("cloudinary").v2;

const createPost = async (postObject, user, multerImages) => {
  let newPost;
  const title = postObject.title;
  let textareas = [];
  let textarea;
  if (typeof postObject.textarea === "string") {
    textarea = JSON.parse(postObject.textarea);
  } else {
    for (let i = 0; i < postObject.textarea.length; i++) {
      textareas.push(JSON.parse(postObject.textarea[i]));
    }

    for (let i = 0; i < textareas.length - 1; i++) {
      textareas[i]["next"] = textareas[i + 1].build_id;
    }
  }
  const textMediaBuildIds = [];
  if (multerImages.media !== undefined) {
    const images = multerImages.media;
    const textareaWithImages = textareas.filter(
      (textItem) => textItem.media.length > 0
    );
    for (let i = 0; i < textareaWithImages.length; i++) {
      for (let j = 0; j < textareaWithImages[i].media.length; j++) {
        textMediaBuildIds.push({ build_id: textareaWithImages[i].media[j] });
      }
    }

    for (let i = 0; i < images.length; i++) {
      textMediaBuildIds[i]["media"] = images[i];
    }
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const media_build_ids = [];

  for (media of textMediaBuildIds) {
    const parser = new DatauriParser();
    parser.format(
      path.extname(media.media.originalname).toString(),
      media.media.buffer
    );
    const uniqueFilename = new Date().toISOString();
    const image = await cloudinary.uploader.upload(parser.content, {
      public_id: `theraveway/${media.build_id}/${uniqueFilename}`,
      tags: `theraveway`,
    });
    if (!image) {
      throw new Error("An Error Occured, Try Again");
    }
    media_build_ids.push({
      build_id: media.build_id,
      imageUrl: image.secure_url,
    });
  }

  const parser = new DatauriParser();
  parser.format(
    path.extname(multerImages.image[0].originalname).toString(),
    multerImages.image[0].buffer
  );
  const uniqueFilename = new Date().toISOString();
  const image = await cloudinary.uploader.upload(parser.content, {
    public_id: `theraveway/${uniqueFilename}`,
    tags: `theraveway`,
  });

  if (!image) {
    throw new Error("An Error Occured, Try Again");
  }

  newPost = new Post({
    author: user._id,
    title: postObject.title,
    textareas: typeof postObject.textarea === "string" ? [textarea] : textareas,
    media_build_ids,
    imageUrl: image.secure_url,
  });
  await newPost.save();
};

module.exports = createPost;
