const express = require("express");
const router = express.Router();
const usersService = require("./usersService");
const postsService = require("./postsService");

router.use(usersService);
router.use(postsService);

module.exports = router;
