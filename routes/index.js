const express = require("express");
const passport = require('passport');
const router  = express.Router({mergeParams: true});
const User = require("../models/user");
const Request = require("../models/request");

/**
 * Index Views
 */
router.get('/landing', function (req, res) {
    res.render('landing')
});

router.get('/', function (req, res) {
    User.find({}).then( users => res.render('index', {users: users}) );
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

/**
 * User Views
 */
router.get('/profile', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.render('profile', {user: user});
        }
    })
});

/**
 * Request Views
 */

// create a new request
router.post('/requests', function (req, res) {
    var fu_id = req.user._id;
    var tu_id = req.body.tu;

    Promise.all([
        User.findById(fu_id),
        User.findById(tu_id),
    ]).then( ([fu, tu]) => {
        var newRequest = {
            fu: {
                id: fu._id,
                username: fu.username
            },
            tu: {
                id: tu._id,
                username: tu.username
            },
            rt: 'VideoInvitation',
            status: 'Pending'
        };
        return Request.create(newRequest);
    }).then((newRequest) => {
        res.redirect("/requests");
    }).catch( err => {
        console.log(err);
    });
});

router.post('/requests/:id/edit', function (req, res) {
    Request.findById(req.params.id).then(
        request => {
            request.status = req.body.status;
            request.save();
            res.redirect('/requests');
        }
    );
});

// Show all requests of a user
router.get('/requests', function (req, res) {
    Request.find({'fu.id': req.user._id}).then(requests => {
        res.render('requests', {requests: requests});
    }).catch(err => console.log(err));
});



module.exports = router;