import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  creator: String,
  open: Boolean,
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  likedBy:[],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostCollection = mongoose.model("Post", postSchema);

export default PostCollection;

