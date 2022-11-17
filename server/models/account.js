const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "1" },
  followers: { type: [String], default: [] },
  following: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('account', accountSchema);
