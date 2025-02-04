const express = require("express");
const {
  enhanceHeadline,
  generateContent,
  enhanceContent,
  generateHeadline,
  generatekeywords,
} = require("../utils/gemini");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/blogController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// ...............Title.................

router.post("/enhance-title", updatePost, protect, async (req, res) => {
  const { prompt } = req.body; //How to get more users for your saas
  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }
  try {
    const content = await enhanceHeadline(prompt);
    return res.status(200).json({ generatedContent: content });
  } catch (error) {
    console.error("Error from generating content", error);
    return res
      .status(500)
      .json({ error: "Failed to generate content:", error });
  }
});
router.post("/generate-title", async (req, res) => {
  const { prompt } = req.body; //How to get more users for your saas
  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }
  try {
    const content = await generateHeadline(prompt);
    return res.status(200).json({ generatedContent: content });
  } catch (error) {
    console.error("Error from generating content", error);
    return res
      .status(500)
      .json({ error: "Failed to generate content:", error });
  }
});

// ...............Content.................

router.post("/generate-content", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }
  try {
    const content = await generateContent(prompt);
    return res.status(200).json({ generatedContent: content });
  } catch (error) {
    console.error("Error from generating content", error);
    return res
      .status(500)
      .json({ error: "Failed to generate content:", error });
  }
});
router.post("/enhance-content", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }
  try {
    const content = await enhanceContent(prompt);
    return res.status(200).json({ generatedContent: content });
  } catch (error) {
    console.error("Error from generating content", error);
    return res
      .status(500)
      .json({ error: "Failed to generate content:", error });
  }
});

// ...............Keywords.................

router.post("/generate-keywords", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }
  try {
    const content = await generatekeywords(prompt);
    return res.status(200).json({ generatedContent: content });
  } catch (error) {
    console.error("Error from generating content", error);
    return res
      .status(500)
      .json({ error: "Failed to generate content:", error });
  }
});

module.exports = router;
