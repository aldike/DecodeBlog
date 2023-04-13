const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'))
app.set("view engine", "ejs");

app.get('/', (req, res) =>{
    res.render("index")
})
app.get('/myblogs', (req, res) =>{
    res.render("myblogs")
})
app.get('/blog', (req, res) =>{
    res.render("blog")
})
app.get('/blog-nolog', (req, res) =>{
    res.render("blog-nolog")
})
app.get('/new-blog', (req, res) =>{
    res.render("new-blog")
})

app.get('/login', (req, res) =>{
    res.render("login")
})

app.get('/registration', (req, res) =>{
    res.render("registration")
})

const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server is listening to Port ${PORT}`);
});

