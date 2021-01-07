// koa入口文件
const Koa = require('koa');
const router = require('koa-router')();
const json = require('koa-json');
const logger = require('koa-logger');
const auth = require('./server/routes/auth');
const api = require('./server/routes/api');
const jwt = require('koa-jwt');
const path = require('path');
const serve = require('koa-static');
const historyApiFallback = require('koa-history-api-fallback');

const app = new Koa();

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

// 显示执行的时间
app.use(async (ctx, next) => {
    let start = new Date;
    await next();
    let ms = new Date - start;
    console.log('%s %s - %s', ctx.request.method, ctx.request.url, ms);
})

// app.use(async (ctx, next) => {
//     try {
//         await next;
//     } catch (err) {
//         if (err.status == 401) {
//             ctx.response.status = 401;
//             ctx.response.body = {
//                 success: false,
//                 token: null,
//                 info: 'Protected resource, use Authorization header to get access'
//             }
//         } else {
//             throw err;
//         }
//     }
// })

app.on('error', function (ctx, err) {
    console.log('server error', err);
})

router.use('/auth', auth.routes());   // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径
router.use('/api', jwt({secret: 'vue-koa-demo'}), api.routes());

app.use(router.routes());

app.use(historyApiFallback());
app.use(serve(path.resolve('dist')));

app.listen(8889, () => {
    console.log('Koa is listening in 8889');
})

module.exports = app;