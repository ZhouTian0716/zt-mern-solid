const express = require("express");
// 👻 Starting by calling with express
const router = express.Router();

const {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/posts.js");

// 👻 Define your routes and methods (from controller folder)
// add auth middleware later
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/", deletePost);
router.patch("/:id/likePost", likePost);

module.exports = router;
