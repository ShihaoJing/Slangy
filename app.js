const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require("koa-views");
const seedDB = require("./seed");

// require routes
var indexRoutes = require("./routes/index");

// app config
const app = new Koa();
app.use(bodyParser());
app.use(views("./views", {map: {html: 'ejs'}}));

// seed DB
seedDB().catch(error => console.log(erro.stack));

// log request URL:
app.use(async (ctx, next) => {
    console.log(new Date().toLocaleTimeString() + ' --- ' + ctx.request.method + ' ' + ctx.request.url);
    await next();
});

// add router middleware:
app.use(indexRoutes.routes());
  
// response

app.use(async ctx => {
ctx.body = 'Hello World';
});
  
app.listen(3000);

console.log("Slangy started...");