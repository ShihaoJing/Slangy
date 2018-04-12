const express = require('express');
const passport = require('passport');
const router  = express.Router({mergeParams: true});
const User = require('../models/user');
const Post = require('../models/post');
const Relationship = require('../models/relationship');

/**
 * Index Routes
 */
router.get('/landing', function (req, res) {
    res.render('landing')
});

router.get('/', function (req, res) {
    // User.find({
    //     _id: {
    //         $ne: req.user._id
    //     }
    // }).then( users => res.render('index', {users: users}) );
    //User.find({}).then( users => res.render('index', {users: users}) );
    res.redirect('/posts');
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
 * User Routes
 */
router.get('/users/:id/profile', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.render('user_profile', {user: user});
        }
    })
});

router.post('/users/:id/profile', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedUser) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/users/' + req.params.id + '/profile');
        }
    })
});

router.get('/users/:id/profile/edit', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.render('profile_form', {user: user});
        }
    })
});

// ONLY FOR DEBUG
router.get('/users', (req, res) => {
    User.find({}).then( users => res.render('index', {users: users}) );
});

/**
 * Relationship Routes
 */
router.get('/users/:id/relationships', (req, res) => {
    Relationship.find({user_id: req.params.id}).then(relationships => {
        res.render('user_connections', {relationships: relationships});
    });
});

router.post('/users/:id/relationships', (req, res) => {
});

router.put('/users/:id/relationships/:rs_ip', (req, res) => {

});

router.delete('/users/:id/relationships/:rs_ip', (req, res) => {

});

router.get('/relationships', (req, res) => {

});

router.post('/relationships', (req, res) => {
    Relationship.create(req.body.rs).then( newRelationship => {
        newRelationship.type = "Video Chat";
        newRelationship.status = "Exist";
        newRelationship.save();
        res.redirect('/users/' + req.user._id + '/relationships')
    });
});



/**
 * Post Routes
 */

// ONLY FOR DEBUG
router.get('/posts', function (req, res) {
    Post.find({}).then(posts => res.render('index', {posts: posts}));
 });


router.get('/posts/new', function (req, res) {
    res.render('post_form.html');
});

router.get('/users/:id/posts', function (req, res) {
    Promise.all([
        Post.find({
            fu_id: req.params.id
        }),
        Post.find({
            applicants: req.params.id
        })
    ]).then( ([my_posts, applied_posts]) => {
        res.render('user_posts', {my_posts: my_posts, applied_posts: applied_posts});
    });
});


router.post('/posts', function (req, res) {
    Post.create(req.body.post).then(post => {
        post.fu_id = req.user._id;
        post.fu_username = req.user.username;
        post.status = 'open';
        post.save();
        res.redirect('/posts');
    });
});

router.get('/posts/:id/edit', function (req, res) {
    
 });

router.post('/posts/:id', function (req, res) {

});

router.delete('/posts/:id', function (req, res) {

});

router.post('/posts/:id/join', function (req, res) {
    Post.findById(req.params.id).then(post => {
        post.applicants.push(req.user._id);
        post.save();
        res.redirect('/posts'); 
    });
});


module.exports = router;