// koa入口文件
const Koa = require('koa');
const router = require('koa-router')();
const json = require('koa-json');
const logger = require('koa-logger');
const auth = require('./server/routes/auth');

const app = new Koa();

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

// 显示执行的时间
app.use(async (next) => {
    let start = new Date;
    await next();
    let ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
})

app.on('error', function (err) {
    console.log('server error', err);
})

router.use('/auth', auth.routes());   // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径

app.use(router.routes());   // 将路由规则挂载到Koa上

app.listen(8889, () => {
    console.log('Koa is listening in 8889');
})

module.exports = app;