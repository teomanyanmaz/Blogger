const express = require("express");
const router = express.Router();
const api = require("./api");

const apiUrl = api("http://localhost:4000");

router.get("/users", (req, res) => {
  apiUrl
    .get(req.path)
    .then((resp) => {
      res.status(200).send(resp.data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

router.post("/users", (req, res) => {
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
