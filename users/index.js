const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./User");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  User.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

app.post("/users", async (req, res) => {
  const { username, password, country } = req.body;
  const user = new User({
    username,
    password,
    country,
  });
  user
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

//app.delete to delete a user with remove
// app.patch to update a user with updateOne

app.patch("/users/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: { username: req.body.username },
  })
    .then((user) => {
      if (!user) {
        res.status(400).send("User Not Found");
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

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
