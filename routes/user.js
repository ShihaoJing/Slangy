const express = require("express");
const router  = express.Router({mergeParams: true});
const Request = require('../models/request');
const User = require("../models/user");

router.get('/users', function (req, res) {
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

module.exports = router;