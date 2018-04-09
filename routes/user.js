const router = require('koa-router')(); // required is a function
const User = require('../models/user');

router.get('/user', async (ctx, next) => {
    ctx.body = await User.find();
});

module.exports = router;