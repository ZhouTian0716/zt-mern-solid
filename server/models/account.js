import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: Boolean,
  avatar: String,
  followers: [],
  following: [],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const AccountCollection = mongoose.model("Account", accountSchema);

export default AccountCollection;
