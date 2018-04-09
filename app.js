const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// require routes
var indexRoutes = require(__dirname + '/routes');

// app config
const app = new Koa();
app.use(bodyParser());

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