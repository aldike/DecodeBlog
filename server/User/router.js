const express = require('express')
const router = express.Router();
const {bookmarkBlog} = require('./controller')

router.post('/api/bookmarkBlog', bookmarkBlog)

module.exports = router