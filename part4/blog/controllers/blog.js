const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter
  .route("/")
  .get(async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
  })
  .post(async (req, res) => {
    const { author, title, url, likes } = req.body;

    if (!title || !url) res.status(400).end();

    const blog = new Blog({
      author: author || "unknown",
      title,
      url,
      likes: likes || 0,
    });

    const result = await blog.save();
    res.status(201).json(result);
  });

blogRouter
  .route("/:id")
  .delete(async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  })
  .put(async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  });

module.exports = blogRouter;
