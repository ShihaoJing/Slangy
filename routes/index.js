const express = require("express");
const router  = express.Router({mergeParams: true});

router.get('/landing', function (req, res) {
    res.render('landing')
});

router.get('/', function (req, res) {
    res.render('index')
});

module.exports = router;