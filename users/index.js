const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./User");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
  });
  const savedUser = await user.save();
  res.json(savedUser);
});
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//app.delete to delete a user with remove
// app.patch to update a user with updateOne

//Database Connection
mongoose.connect("mongodb://localhost:27017/BloggerUsers", {
  useNewUrlParser: true,
});
mongoose.connection
  .once("open", () => console.log("Connected to Mongodb"))
  .on("error", (error) => {
    console.log("Error:", error);
  });

app.listen(4000, () => {
  console.log("Listening on 4000");
});
