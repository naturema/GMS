const Koa = require("koa");
const views = require("koa-views");
const staticDir = require("koa-static");
const path = require("path");
const router = require("./server/router");
const bodyParser = require("koa-bodyparser");
const koaBody = require("koa-body");

const app = new Koa();
app.use(koaBody());
app.use(staticDir(path.join(__dirname, "./dist")));

// 配置ctx.body解析中间件
app.use(bodyParser());

app.use(views("./dist"));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);
console.log("[GMS] server is starting at port 3001");
