const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/blogController");

router.get("/protected", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
});
// Fetching Users Post
router.get("/all", protect, getAllPosts);
router.get("/:id", protect, getPostById);

// Creating user posts
router.post("/createpost", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
