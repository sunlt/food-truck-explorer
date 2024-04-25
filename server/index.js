const path = require('path');
const Koa = require('koa');
const KoaJson = require('koa-json'); 
const KoaBodyparser = require('koa-bodyparser'); 
const KoaStatic = require('koa-static');  
const apiRouter  = require('./api'); 

const app = new Koa();
/**
 * Middlewares.
 */
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${ctx.status} - ${rt}`);
});
 
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
}); 

app.use(
    KoaBodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
);
app.use(KoaJson()); 
app.use(KoaStatic(path.join(__dirname, '../client/build')));

/**
 * API routes.
 */
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

/**
 * Error-handling.
 */
app.on('error', (err, ctx) => {
    ctx.log.error('server error', err, ctx);
});

app.listen(3000);