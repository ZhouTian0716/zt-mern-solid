import mongoose from "mongoose";
// 👻 Controllers Need Access to Models
import PostCollection from "../models/post.js";

export const createPost = async (req, res) => {
  // console.log(req.body)
  const post = req.body;
  const newPost = new PostCollection(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ ServerReportError: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostCollection.find();
    // 笔记: json()里的res最好在insomnia里面测试检查一下结构
    // 方便前端引用
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ ServerReportError: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).send(`No post with id: ${id}`);
  try {
    const post = await PostCollection.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ ServerReportError: error });
  }
}

export const updatePost = async (req, res) => {
  // Destructure and rename to _id
  const { id: _id } = req.params;
  const post = req.body;
  console.log(post);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await PostCollection.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  console.log(req.body);
  const { postId } = req.body;

  try {
    // const postSelected = await PostCollection.findById(postId).exec();
    // const result = await postSelected.deleteOne();
    const result = await PostCollection.findByIdAndRemove(postId);
    res.status(201).json({ status: "delete success", item_id: result._id });
  } catch (error) {
    res.status(409).json({ ServerReportError: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const post = await PostCollection.findById(id);
  const updatedPost = await PostCollection.findByIdAndUpdate(
    id,
    {
      likeCount: post.likeCount + 1,
    },
    {
      new: true,
    }
  );

  res.json(updatedPost.likeCount);
};
