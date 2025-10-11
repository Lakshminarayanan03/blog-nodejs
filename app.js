const express = require('express');
const { result } = require('lodash');
const  mongoose = require('mongoose');
const blogroutes = require('./routes/blogRoutes');



const { render } = require('ejs');



const app = express();

const dbURI = 'mongodb+srv://badhridb:bhd123@cluster0.u0rxx.mongodb.net/'

mongoose.connect(dbURI)
    .then(() => app.listen(3000))
    .catch(err => console.error("Database connection error:", err));

    
    

app.set('view engine', 'ejs');




app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));



app.get('/' , (req,res) => {
    res.redirect('/blogs')
});

app.get('/about' , (req,res) => {
   res.render('about' );

});
//router
app.use('/blogs',blogroutes);


app.get('/create' , (req,res) => {
    res.render('create');
 });
app.use((req,res) => {
    res.status(404).render('404');
});