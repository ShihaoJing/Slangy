const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ejs = require('ejs');
const bodyParser = require('body-parser');
const seedDB = require('./seed');

const User = require('./models/user');

// seed DB
//seedDB();

// require routes
var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/user');
var requestRoutes = require('./routes/request');

// app config
const app = new express();
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./static'));
app.use(require('express-session')({
    secret: 'Corn Pig',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
})

// add routes:
app.use(indexRoutes);

app.listen(3000, () => console.log("Slangy started..."));