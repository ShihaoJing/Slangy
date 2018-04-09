const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticServe = require('koa-static');
const views = require('koa-views');
const seedDB = require('./seed');

// seed DB
seedDB().catch(error => console.log(erro.stack));

// require routes
var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/user');

// app config
const app = new Koa();
app.use(bodyParser());
app.use(views('./views', {map: {html: 'ejs'}}));
app.use(staticServe('./static'))

// log request URL:
app.use(async (ctx, next) => {
    console.log(new Date().toLocaleTimeString() + ' --- ' + ctx.request.method + ' ' + ctx.request.url);
    await next();
});

// add routes:
app.use(indexRoutes.routes());
app.use(userRoutes.routes());

  
app.listen(3000);

console.log("Slangy started...");