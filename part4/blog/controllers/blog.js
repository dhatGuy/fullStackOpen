require("dotenv").config();
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { tokenExtractor } = require("../utils/middleware");

blogRouter
  .route("/")
  .get(async (req, res) => {
    const blogs = await Blog.find({}).populate("user");
    res.json(blogs);
  })
  .post(tokenExtractor, async (req, res) => {
    const { author, title, url, likes } = req.body;

    const user = await User.findById(req.user);

    if (!title || !url) res.status(400).end();

    const blog = new Blog({
      author: author || "unknown",
      title,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();
    res.status(201).json(savedBlog);
  });

blogRouter
  .route("/:id")
  .get(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog.toJSON());
    } else {
      res.status(404).end();
    }
  })
  .delete(tokenExtractor, async (req, res) => {
    const { user } = req;
    const blog = await Blog.findById(req.params.id);

    if (blog === null) return res.status(400).end();

    if (blog.user.toString() === user) {
      await Blog.findByIdAndRemove(req.params.id);
      res.status(204).end();
    } else {
      res.status(400).end();
    }
  })
  .put(async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  });

module.exports = blogRouter;
