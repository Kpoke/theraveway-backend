const Gallery = require("../model/gallery");

const getGalleryPosts = async (query) => {
  const { limit, skip } = query;
  let length = await Gallery.countDocuments();
  let gallery = await Gallery.find()
    .sort({
      createdAt: "descending",
    })
    .limit(parseInt(limit))
    .skip(parseInt(skip));

  return { gallery, length };
};

module.exports = getGalleryPosts;
