const mongoose = require("mongoose");
// 👻 Controllers Need Access to Models
const PostCollection = require("../models/post.js");

const createPost = async (req, res) => {
  // console.log(req.body)
  if (!req?.body) {
    return res
      .status(400)
      .json({ message: "Post body required" });
  }

  const post = req.body;
  // remove this later
  console.log(post);
  try {
    const result = await PostCollection.create(post);
    
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const data = await PostCollection.find();
    if (!data) return res.status(204).json({ message: "No data found" });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const post = await PostCollection.findById(id);
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
  }
};

const updatePost = async (req, res) => {
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

const deletePost = async (req, res) => {
  console.log(req.body);
  const { postId } = req.body;

  try {
    // const postSelected = await PostCollection.findById(postId).exec();
    // const result = await postSelected.deleteOne();
    const result = await PostCollection.findByIdAndRemove(postId);
    res.status(201).json({ status: "delete success", item_id: result._id });
  } catch (err) {
    console.error(err);
  }
};

const likePost = async (req, res) => {
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

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
};
