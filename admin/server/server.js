const http = require('http');
const Koa = require("koa");
const ksession = require("koa-session"); // session
const kjwt = require("koa-jwt"); // token
const kbodyparser = require("koa-bodyparser"); // post 请求body,不支持form-data类型
// const koaBody = require('koa-body');
const kcompose = require("koa-compose");
const kstatic = require("koa-static"); // 静态文件
const khelmet = require("koa-helmet"); // 安全
const klogger = require("koa-logger"); // 日志

const path = require('path');
const fs = require('fs');

const router = require("./Routes/index");

const app = new Koa();

app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(ksession(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

app.use(khelmet());
app.use(kbodyparser());
app.use(klogger());

app.use(router);

app.use(async ctx => {
    ctx.body = 'Hello World';
});

http.createServer(app.callback()).listen(3000);
