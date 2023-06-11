const express = require('express');
const router = express.Router();
const Category = require('../Categories/Category');
const User = require('../auth/User');
const Blog = require('../blogs/blog')

router.get('/', async(req, res) =>{
    const options = {}
    const categories = await Category.findOne({key: req.query.category})
    if(categories){
        options.category = categories._id
        res.locals.category = req.query.category
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title: new RegExp(req.query.search, 'i')
            },
            {
                description: new RegExp(req.query.search, 'i')
            }
        ]
        res.locals.search = req.query.search
    }
    const totalBlogs = await Blog.count(options)
    const allCategories = await Category.find();
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('category');
    const user = req.user ? await User.findById(req.user._id) : {}
    res.render("index", {categories: allCategories, user, blogs, pages: Math.ceil(totalBlogs / limit)})
})
router.get('/myblogs/:id', async(req, res) =>{
    const options = {}
    const categories = await Category.findOne({key: req.query.category})
    if(categories){
        options.category = categories._id
        res.locals.category = req.query.category
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title: new RegExp(req.query.search, 'i')
            }
        ]
        res.locals.search = req.query.search
    }
    const totalBlogs = await Blog.count(options);
    const user = req.user ? await User.findById(req.user._id) : {}
    const allCategories = await Category.find();
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('category');
    if(user){
        res.render("myblogs", {categories: allCategories, user, blogs, pages: Math.ceil(totalBlogs / limit)})
    }
})
router.get('/blog/:id', async(req, res) =>{
    const blog = await Blog.findById(req.params.id).populate('category');
    const user = req.user ? await User.findById(req.user._id) : {}

    res.render("blog", {user, blog})
})
router.get('/new', async(req, res) =>{
    const allCategories = await Category.find();
    res.render("newBlog", {categories: allCategories, user:req.user ? req.user: {}})
})
router.get('/edit/:id', async(req, res) =>{
    const user = req.user ? await User.findById(req.user._id) : {}
    const allCategories = await Category.find();
    const blog = await Blog.findById(req.params.id);
    res.render("editBlog", {categories: allCategories, user, blog})
})
router.get('/login', (req, res) =>{
    res.render("login", {user:req.user ? req.user: {}})
})

router.get('/registration', (req, res) =>{
    res.render("registration", {user:req.user ? req.user: {}})
})

module.exports = router