const express = require('express');
const router = express.Router();


router.get('/', (req, res) =>{
    res.render("index")
})
router.get('/myblogs', (req, res) =>{
    res.render("myblogs")
})
router.get('/blog', (req, res) =>{
    res.render("blog")
})
router.get('/blog-nolog', (req, res) =>{
    res.render("blog-nolog")
})
router.get('/new-blog', (req, res) =>{
    res.render("new-blog")
})

router.get('/login', (req, res) =>{
    res.render("login")
})

router.get('/registration', (req, res) =>{
    res.render("registration")
})

module.exports = router