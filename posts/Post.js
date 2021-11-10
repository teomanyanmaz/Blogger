const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
