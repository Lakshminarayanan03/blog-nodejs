require('dotenv').config();

const express = require('express');
const { result } = require('lodash');
const mongoose = require('mongoose');
const blogroutes = require('./routes/blogRoutes');

const { render } = require('ejs');

const app = express();

const dbURI = process.env.MONGO_URI;

// Connect to MongoDB
if (dbURI) {
    mongoose.connect(dbURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error("Database connection error:", err));
} else {
    console.warn('MONGO_URI not found in environment variables');
}

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

    
    

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');




app.use(express.static(__dirname + '/public'));
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


module.exports = app;