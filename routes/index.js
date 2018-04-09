const router = require('koa-router')(); // required is a function

router.get('/landing', async (ctx, next) => {
    await ctx.render('landing');
});

router.get('/', async (ctx, next) => {
    await ctx.render('index');
});

module.exports = router;