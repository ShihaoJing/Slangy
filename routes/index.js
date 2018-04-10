const express = require("express");
const passport = require('passport');
const router  = express.Router({mergeParams: true});
const User = require("../models/user");

router.get('/landing', function (req, res) {
    res.render('landing')
});

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    User.register(new User({ username : req.body.username }), req.body.password, (err, user)=> {
        if (err) {
            console.log(err);
            res.redirect('/register');
        }
        
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {failureRedirect: 'login'}), (req, res) => {
    console.log('logged in' + req.user.username);
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;