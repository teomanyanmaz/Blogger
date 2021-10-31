const express = require('express');
const router = express.Router()
const feedService = require('./usersService')
const hashtagService = require('./postsService')

router.use(feedService)
router.use(hashtagService)

module.exports = router