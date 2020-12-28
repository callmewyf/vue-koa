// koa入口文件
const Koa = require('koa');

const app = new Koa();

// 显示执行的时间
app.use(async (ctx, next) => {
    let start = new Date;
    await next();
    let ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
})

app.on('error', function (err, ctx) {
    console.log('server error', err);
})

app.listen(8889, () => {
    console.log('Koa is listening in 8889');
})

module.exports = app;