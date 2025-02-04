const Blog = require("../models/Blog");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Blog({
      title,
      content,
      author: req.user.id,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Blog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure only the author can edit
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure only the author can delete
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Blog.find().populate("author", "username email"); // Fetch post author details
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).populate(
      "author",
      "username email"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};
