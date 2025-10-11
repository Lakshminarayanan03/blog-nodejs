//blog_index,blog_home,blog_details,blog_delete
const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => res.render('blogs/index', { blogs: result }))
        .catch(err => res.status(500).send("Error fetching blogs."));
};


const blog_home = (req,res) =>{
    const blog = new Blog(req.body); 

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    });
}

const blog_details = (req,res) =>{
     const id = req.params.id;
        Blog.findById(id)
        .then(result =>  res.render('blogs/details',{blog : result , title: 'blog details'}))
        .catch(err => res.status(404).render('404'));
}

const blog_delete = (req,res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
       
        res.json({ redirect : '/blogs' })
    });
}

module.exports = {
    blog_index,
    blog_home,
    blog_details,
    blog_delete
};