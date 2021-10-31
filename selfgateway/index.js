const express = require("express");
const app = express();
const router = express.Router();
const usersService = require("./router/usersService");
const postsService = require("./router/postsService");

app.use(express.json());
app.use(router);

router.use(usersService);
router.use(postsService);

app.listen(5000, () => {
  console.log("Listening on 5000");
});
