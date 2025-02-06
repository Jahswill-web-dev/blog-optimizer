const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const { enhanceHeadline, generateContent, enhanceContent } = require("../utils/gemini");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (title || content) {
      let enhancedTitle = title;
      let enhancedContent = content;
      try {
        if (title) enhancedTitle = await enhanceHeadline(title);
        // const content = await enhanceHeadline(title);
        // if (content) return res.status(200).json({generateContent:content});
      } catch (error) {
        console.error("error enhancing title", error);
        return res
          .status(500)
          .json({ message: "Error enhancing title", error: error.message });
      }
      try {
        if (content) enhancedContent = await enhanceContent(content);
      } catch (error) {
        console.error("error enhancing content", error);
        return res
          .status(500)
          .json({ message: "Error enhancing content", error: error.message });
      }
      const newPost = new Blog({
        title,
        content,
        enhancedTitle,
        enhancedContent,
        author: req.user.id,
      });
      await newPost.save();
      res.status(201).json(newPost);
    } else {
      return res.status(400).json({ error: "prompt is required" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    let enhancedTitle = title;
    let enhancedContent = content;
    let post;
    try {
       post = await Blog.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      return res
        .status(500)
        .json({ message: "Error finding post", error: error.message });
    }

    // Ensure only the author can edit
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this post" });
    }

    if (title && title !== post.title) {
      post.title = title;
      try {
        if (title) post.enhancedTitle = await enhanceHeadline(title);
      } catch (error) {
        console.error("error enhancing title", error);
        return res
          .status(500)
          .json({ message: "Error enhancing title", error: error.message });
      }
    }
    if (content && content !== post.content) {
      post.content = content;
      try {
        if (content) post.enhancedContent = await enhanceContent(content);
      } catch (error) {
        console.error("error enhancing content", error);
        return res
          .status(500)
          .json({ message: "Error enhancing content", error: error.message });
      }
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error)
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
