import express from "express";
import {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

// 👻 Starting by calling with express
const router = express.Router();

// 👻 Define your routes and methods (from controller folder)
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
