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
// app config
const app = new express();
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(bodyParser.json());
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

function fakeLogin(req, res, next) {
    var fakeUser = {
        _id: "5acce139fa2bdb377b9c6275",
        username: "Emma",
        fullname: "Emma Watson",
        password: "123",
        email: "emma@qq.com",
        phone: "777-888-999",
        gender: "Female",
        birth: "04-15-1990",
        languages: ["Chinese"]
    };
    req.user = fakeUser;
    next();  
}

app.use(fakeLogin);

 app.use(function(req, res, next){
     res.locals.login_user = req.user;
     next();
 });

// add routes:
app.use(indexRoutes);

app.listen(3000, () => console.log("Slangy started..."));