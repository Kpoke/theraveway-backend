const multer = require("multer");

module.exports = multer({
  limits: {
    fileSize: 7000000,
  },
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(/\.(jpg|jpeg|gif|png|mp4|mov|avi|mkv|jfif)$/)
    ) {
      return cb(new Error("Please upload an image or video"));
    }
    cb(undefined, true);
  },
});
