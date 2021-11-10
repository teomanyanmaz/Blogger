const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require("./Post");
const User = require("../users/User");

const app = express();
app.use(express.json());
app.use(cors());

//Posts of a user
app.get("/users/:id/posts", (req, res) => {
  Post.find({ userId: req.params.id })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.post("/users/:id/posts", (req, res) => {
  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
    userId: req.params.id,
  });
  post
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//all Posts
app.get("/posts", (req, res) => {
  Post.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
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
