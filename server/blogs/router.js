const express = require('express');
const router = express.Router();
const {upload} = require('./multer');
const {createBlog, editBlog, deleteBlog, bookmarkBlog, deleteFromBookmark} = require('./controller');
const {isAuth} = require('../auth/middlewares');

router.post('/api/blogs/new', isAuth, upload.single('image'), createBlog);
router.post('/api/blogs/edit', isAuth, upload.single('image'), editBlog);
router.delete('/api/blogs/:id', isAuth, deleteBlog);
router.post('/api/blogs/bookmark', isAuth, bookmarkBlog);
router.delete('/api/blogs/bookmark/:id', isAuth, deleteFromBookmark);


module.exports = router