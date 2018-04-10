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
    var fu_id = req.body.sender_id;
    console.log(fu_id);
    var tu_id = req.body.receiver_id;
    console.log(tu_id);

    Promise.all([
        User.findById(fu_id),
        User.findById(tu_id),
    ]).then( ([sender, receiver]) => {
        var newRequest = {
            fu: {
                id: sender._id,
                username: sender.username
            },
            tu: {
                id: receiver._id,
                username: receiver.username
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
router.get('/api/users/:id/requests', function (req, res) {
    Request.find().then(allRequests => {
        var requests = [];
        allRequests.forEach(request => {
            if (request.fu.id.equals(req.params.id)) {
                requests.push(request);
            }
        });
        res.send(requests);
    }).catch(err => console.log(err));
});

router.get('/requests', function (req, res) {
    res.render('requests/index.html');
});



module.exports = router;