const express = require('express');
const router = express.Router();


router.get('/', (req, res) =>{
    res.render("index", {user:req.user ? req.user: {}})
})
router.get('/myblogs/:id', (req, res) =>{
    res.render("myblogs", {user:req.user ? req.user: {}})
})
router.get('/blog', (req, res) =>{
    res.render("blog", {user:req.user ? req.user: {}})
})
router.get('/blog-nolog', (req, res) =>{
    res.render("blog-nolog", {user:req.user ? req.user: {}})
})
router.get('/new-blog', (req, res) =>{
    res.render("new-blog", {user:req.user ? req.user: {}})
})

router.get('/login', (req, res) =>{
    res.render("login", {user:req.user ? req.user: {}})
})

router.get('/registration', (req, res) =>{
    res.render("registration", {user:req.user ? req.user: {}})
})

module.exports = router