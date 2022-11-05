// 👻 Controllers Need Access to Models
import PostModel from "../models/post.js";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostModel(post);
  try {
    await newPost.save();
    res.status(201).json({ Added: newPost });
  } catch (error) {
    res.status(409).json({ ServerReportError: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find();
    // 笔记: json()里的res最好在insomnia里面测试检查一下结构
    // 方便前端引用
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ ServerReportError: error.message });
  }
};

export const updatePost = (req, res) => {
  res.send("hello to update route");
};

export const deletePost = async (req, res) => {
  const { postId } = req.body;
  try {
    const postSelected = await PostModel.findById(postId).exec();
    const result = await postSelected.deleteOne();
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ ServerReportError: error.message });
  }
};


