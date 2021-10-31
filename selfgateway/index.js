const express = require("express");
const app = express();
const router = require("./router/router");

app.use(express.json());

app.use(router);

app.listen(5000, () => {
  console.log("Listening on 5000");
});
