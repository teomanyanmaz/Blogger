const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const api = require("./api");

const apiUrl = api("http://localhost:4001");

router.get("/users/:id/posts", (req, res) => {
  apiUrl
    .get(req.path)
    .then((resp) => {
      res.status(200).send(resp.data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

router.post("/users/:id/posts", (req, res) => {
  apiUrl
    .post(req.path, req.body)
    .then((resp) => {
      res.status(200).send(resp.data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});
module.exports = router;

router.get("/posts", (req, res) => {
  const users = [];
  axios
    .all([
      axios.get("http://localhost:4000/users"),
      axios.get("http://localhost:4001/posts"),
    ])
    .then(
      axios.spread((...resp) => {
        const userData = resp[0].data;
        const postData = resp[1].data;
        userData.forEach((item) => {
          users.push({
            userInfo: {
              username: item.username,
              country: item.country,
            },
            posts: [],
          });
        });
        for (var i = 0; i < userData.length; i++) {
          for (var j = 0; j < postData.length; j++) {
            if (userData[i]._id == postData[j].userId) {
              users[i].posts.push({
                title: postData[j].title,
                createDate: postData[j].createDate,
              });
            }
          }
        }
        res.status(200).send(users);
      })
    )
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});


// response model:
/*
  { userInfo: {
    name: "teo",
    country: "tr",
    
  },
  posts: [
    {
      title:
      createDate: 
    }
  ]}
*/
