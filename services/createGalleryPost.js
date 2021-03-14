const Gallery = require("../model/gallery");
const path = require("path");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
const cloudinary = require("cloudinary").v2;

const createGalleryImagePost = async (postObject, user, multerImage, query) => {
  const { video } = query;
  const uniqueFilename = new Date().toISOString();
  let newPost;
  let cloudinaryOptions = {
    public_id: `theraveway/${uniqueFilename}`,
    tags: `theraveway/gallery`,
  };
  if (video !== undefined) {
    postObject["isVideo"] = true;
    cloudinaryOptions["resource_type"] = "video";
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  parser.format(
    path.extname(multerImage.originalname).toString(),
    multerImage.buffer
  );

  const image = await cloudinary.uploader.upload(
    parser.content,
    cloudinaryOptions
  );

  if (!image) {
    throw new Error("An Error Occured, Try Again");
  }
  newPost = new Gallery({
    ...postObject,
    author: user._id,
    imagePublicId: image.public_id,
    imageUrl: image.url,
  });
  await newPost.save();
};

module.exports = createGalleryImagePost;
