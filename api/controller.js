const checkUser = require("../utilities/checkUser"),
  signup = require("../services/signup"),
  login = require("../services/login"),
  createPost = require("../services/createPost"),
  createComment = require("../services/createComment"),
  getPosts = require("../services/getPosts"),
  getSinglePost = require("../services/getSinglePost"),
  getComments = require("../services/getComments"),
  setTrendingToFalse = require("../services/setTrendingToFalse"),
  findPosts = require("../services/findPosts"),
  deletePost = require("../services/deletePost"),
  getGalleryPosts = require("../services/getGalleryPosts"),
  createGalleryPost = require("../services/createGalleryPost"),
  getPopularPosts = require("../services/getPopularPosts.js");

const controllers = {
  signup: async (req, res) => {
    const { username, password } = req.body;
    let isAdmin = false;
    req.body.isAdmin ? (isAdmin = req.body.isAdmin) : (isAdmin = false);
    try {
      const newUser = await checkUser(username.toLowerCase());
      if (newUser) {
        throw new Error("Username already exists");
      }
      const { token, user } = await signup(
        username.toLowerCase(),
        password,
        isAdmin
      );
      res.status(201).send({ token, user });
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  login: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
      return res
        .status(400)
        .send({ error: "Must provide Username or Password" });
    }
    try {
      const user = await checkUser(username);
      if (!user) {
        throw new Error("Invalid username or password");
      }
      const token = await login(password, user);
      res.status(201).send({ token, user: user.toJSON() });
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  newPost: async (req, res) => {
    const postObject = { ...req.body };
    try {
      await createPost(postObject, req.user, req.files);
      res.status(201).send("Post Saved Successfully");
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  newComment: async (req, res) => {
    const newComment = req.body.comment;
    try {
      const savedComment = await createComment(
        newComment,
        req.user,
        req.params.id
      );
      res.status(201).send(savedComment);
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  posts: async (req, res) => {
    try {
      const { posts, length } = await getPosts(req.query);
      res.status(200).send({ posts, length });
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  getSinglePost: async (req, res) => {
    try {
      const post = await getSinglePost(req.params.title, req.ip);
      if (!post) {
        res.status(404).send("Post not Found");
      }
      const comments = await getComments(post._id);
      res.status(200).send({ post, comments });
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  setTrendingFalse: async (req, res) => {
    try {
      const post = await setTrendingToFalse(req.body.postId);
      if (!post) {
        res.status(404).send("Post not Found");
      }
      res.status(200).send("Changed to false successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  searchPosts: async (req, res) => {
    if (req.body.title === "") {
      return res.status(200).send({ posts: [] });
    }
    try {
      const posts = await findPosts(req.body.title);
      if (!posts) {
        return res.status(200).send({ posts: [] });
      }
      res.status(200).send({ posts });
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  deletePosts: async (req, res) => {
    try {
      await deletePost(req.body.postId);
      res.status(200).send();
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  getGallery: async (req, res) => {
    try {
      const { gallery, length } = await getGalleryPosts(req.query);
      res.status(200).send({ gallery, length });
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  newGalleryPost: async (req, res) => {
    const postObject = { ...req.body };
    try {
      await createGalleryPost(postObject, req.user, req.file, req.query);
      res.status(201).send("Post Saved Successfully");
    } catch (e) {
      console.log(e);
      res.status(400).send(e.message);
    }
  },

  getPopularPosts: async (req, res) => {
    try {
      const posts = await getPopularPosts();
      res.status(200).send({ posts });
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
};

module.exports = controllers;
