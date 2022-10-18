// 👻 Controllers Need Access to Models
import PostMessage from "../models/postMessage.js";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json({ Added: newPost });
  } catch (error) {
    res.status(409).json({ ServerReportError: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostMessage.find();
    res.status(200).json({ messages: allPosts });
  } catch (error) {
    res.status(404).json({ ServerReportError: error.message });
  }
};

export const updatePost = (req, res) => {
  res.send("hello to update route");
};

export const deletePost = (req, res) => {
  res.send("hello to delete route");
};
