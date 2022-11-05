import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  creator: String,
  public: Boolean,
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;

// Note: Think about to add location info of creator

// {
//     creator: "Joe Tian",
//     title: "",
//     content: "",
//     public: true,
//     selectedFile: "",
//   }
