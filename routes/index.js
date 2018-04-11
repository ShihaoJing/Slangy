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

router.get('/api/users', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.send(users);
        }
    })
});

router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.render('users/show', {user: user});
        }
    })
});

/**
 * Request Views
 */

// get all requests
router.get('/api/requests', function (req, res) {

});

// create a new request
router.post('/api/requests', function (req, res) {
    var fu_id = req.user._id;
    var tu_id = req.body.tu;
    console.log(req.body);

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
        res.send("success");
    }).catch( err => {
        console.log(err);
    });
});

// Show all requests of a user
router.get('/users/:id/requests', function (req, res) {
    Request.find().then(allRequests => {
        var requests = [];
        allRequests.forEach(request => {
            if (request.fu.id.equals(req.params.id)) {
                requests.push(request);
            }
        });
        res.render('requests/index', {requests: requests});
    }).catch(err => console.log(err));
});



module.exports = router;