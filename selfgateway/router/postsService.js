const express = require("express");
const router = express.Router();
const api = require("./api");

const apiUrl = api("http://localhost:4001");

router.get("/users/:id/posts", (req, res) => {
  apiUrl.get(req.path).then((resp) => {
    res.send(resp.data);
  });
});

router.post("/users/:id/posts", (req, res) => {
  apiUrl.post(req.path,req.body).then((resp) => {
    res.send(resp.data);
  });
});
module.exports = router;
