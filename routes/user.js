const express = require("express");
const router  = express.Router({mergeParams: true});
const Request = require('../models/request');
const User = require("../models/user");

router.get('/user', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.send(users);
        }
    })
});

module.exports = router;