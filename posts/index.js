const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require("./Post");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/users/:id/posts", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/users/:id/posts", async (req, res) => {
  const { title, content} = req.body;
  const post = new Post({
    title,
    content,
    userId: req.params.id,
  });
  const savedPost = await post.save();
  res.json(savedPost);
});

//Database Connection
mongoose.connect("mongodb://localhost:27017/BloggePosts", {
  useNewUrlParser: true,
});
mongoose.connection
  .once("open", () => console.log("Connected to Mongodb"))
  .on("error", (error) => {
    console.log("Error:", error);
  });

app.listen(4001, () => {
  console.log("Listening on 4001");
});
