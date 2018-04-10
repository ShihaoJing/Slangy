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

// get all request
router.get('/users/:id/requests', function (req, res) {
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


// get request form
router.get('/requests/new', function (req, res) {
    res.render('requests/new')
});

// create a new request
router.post('/requests', function (req, res) {
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

// TODO: delete request

// TODO: edit request

module.exports = router;