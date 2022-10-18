import express from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

// 👻 Starting by calling with express
const router = express.Router();

// 👻 Define your routes and methods (from controller folder)
router.get("/", getAllPosts);
router.post("/", createPost);

export default router;
