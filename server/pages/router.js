const express = require('express');
const router = express.Router();


router.get('/', async(req, res) =>{
    const options = {}
    const categories = await Categories.findOne({key: req.query.category})
    if(categories){
        options.category = categories._id
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    const totalBlogs = await Blog.count()
    const allCategories = await Categories.find();
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('category');
    const user = req.user ? await User.findById(req.user._id) : {}
    res.render("index", {Categories: allCategories, user, blogs, pages: Math.ceil(totalFilms / limit)})
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