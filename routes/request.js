const express = require("express");
const router  = express.Router({mergeParams: true});
const Request = require('../models/request');
const User = require("../models/user");

router.get('/requests/show', function (req, res) {
    res.render('requests/index')
});

// get all request
router.get('/requests', function (req, res) {
    Request.find({}, function (err, requests) {
        if (err) {
            console.log(err);
        } else {
            res.send(requests);
        }
    });
});

// get request form
router.get('/requests/new', function (req, res) {
    res.render('requests/new')
});

// create a new request
router.post('/requests', function (req, res) {
    var sender_id = req.body.sender_id;
    console.log(sender_id);
    var receiver_id = req.body.receiver_id;
    console.log(receiver_id);

    Promise.all([
        User.findById(sender_id),
        User.findById(receiver_id),
    ]).then( ([sender, receiver]) => {
        var newRequest = {
            fu: {
                id: sender._id,
                username: sender.name
            },
            tu: {
                id: receiver._id,
                username: receiver.name
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

// TODO: delete request

// TODO: edit request

module.exports = router;