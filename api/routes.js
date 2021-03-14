const controller = require("./controller");
const auth = require("../middlewares/auth");
const isAuthorized = require("../middlewares/isAuthorized");
const upload = require("../middlewares/multerSetup");
const getIp = require("../middlewares/requestIp");

module.exports = (app, path) => {
  app.route("/api/signup").post(controller.signup);
  app.route("/api/login").post(controller.login);
  app.route("/api/posts").get(controller.posts);
  app
    .route("/api/posts/singlePost/:title")
    .get(getIp, controller.getSinglePost);
  app
    .route("/api/:username/posts/new")
    .post(
      auth,
      isAuthorized("isAdmin"),
      upload.fields([{ name: "image" }, { name: "media" }]),
      controller.newPost
    );
  app.route("/api/posts/:id/comment/new").post(auth, controller.newComment);
  app
    .route("/api/posts/trendingToFalse")
    .post(auth, isAuthorized("isSuperAdmin"), controller.setTrendingFalse);
  app
    .route("/api/posts/searchPosts")
    .post(auth, isAuthorized("isAdmin"), controller.searchPosts);
  app
    .route("/api/posts/deletePosts")
    .post(auth, isAuthorized("isSuperAdmin"), controller.deletePosts);
  app.route("/api/posts/gallery").get(controller.getGallery);
  app
    .route("/api/:username/gallery/new/media")
    .post(
      auth,
      isAuthorized("isAdmin"),
      upload.single("media"),
      controller.newGalleryPost
    );
  app.route("/api/posts/getPopularPosts").get(controller.getPopularPosts);
  app.get("*", (req, res) => {
    res.send("Invalid Endpoint");
  });
};
