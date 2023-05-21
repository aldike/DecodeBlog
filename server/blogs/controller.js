const Blog = require('./blog');
const User = require('../auth/User')
const fs = require('fs');
const path = require('path')
const createBlog = async(req, res) =>{
    if(
        req.file &&
        req.body.title &&
        req.body.title.length > 2 &&
        req.body.description &&
        req.body.description.length > 2
        ){
            await new Blog({
                title: req.body.title,
                description: req.body.description,
                image: `/images/blogs/${req.file.filename}`,
                author: req.user._id
            }).save()
            res.redirect(`/myblogs`)
    }else{
        res.redirect('/new?error=1')
    }
}

const editBlog = async(req, res) =>{
    if(
        req.file &&
        req.body.title.length > 2 &&
        req.body.description.length > 2
        ){
            const blogs = await Blog.findById(req.body.id);
            fs.unlinkSync(path.join(__dirname + '../../../public' + blogs.image))
            //      Способ 1
            blogs.title = req.body.title;
            blogs.description = req.body.description;
            blogs.image = `/images/blogs/${req.file.filename}`;
            blogs.author = req.user._id;
            blogs.save();
            //      Способ 2
            // await Film.findByIdAndUpdate(req.body.id, {
            //     titleRus: req.body.titleRus,
            //     titleEng: req.body.titleEng,
            //     year: req.body.year,
            //     time: req.body.time,
            //     country: req.body.country,
            //     genre: req.body.genre,
            //     image: `/images/films/${req.file.filename}`,
            //     author: req.user._id
            // })
            res.redirect('/myblogs/' + req.user._id)
        }else{
            res.redirect(`/editBlog/${req.body.id}?error=1`)
        }
}

const deleteBlog = async(req, res) =>{
    const blog = await Blog.findById(req.params.id)
    if(blog){
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
        await Blog.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}

const bookmarkBlog = async(req, res) =>{
    if(req.user && req.body.id){
        const user = await User.findById(req.user.id)
        const findBlog = user.bookmark.filter(item => item._id == req.body.id);
        if(findBlog.length == 0){
            user.bookmark.push(req.body.id);
            user.save()
            res.send('Blog saved succesfully')
        }else{
            res.send('Blog already saved')
        }
    }

}

const deleteFromBookmark = async(req, res) =>{
    if(req.user && req.params.id){
        const user = await User.findById(req.user.id)
        for(let i = 0; i < user.bookmark.length; i++){
            if(user.bookmark[i] == req.params.id){
                user.bookmark.splice(i, 1)
                user.save()
                res.send('Успешно удалено')
            }
        }
    }
        // res.send('Данные не найдены')
}
module.exports = {
    createBlog,
    editBlog,
    deleteBlog,
    bookmarkBlog,
    deleteFromBookmark
}