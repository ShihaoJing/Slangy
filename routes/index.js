const router = require('koa-router')(); // required is a function
const User = require('../models/user');

router.get('/', async (ctx, next) => {
    try {
        var users = await User.find();
        await ctx.render('index', {users: users});
    } catch (error) {
        console.log(error.stack)
        ctx.body = "User not found";
    }
});

router.post('/signin', async (ctx, next) => {
    
});

module.exports = router;