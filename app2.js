const Koa = require('koa')
const app = new Koa()
Promise = global.Promise
app.use(async (ctx, next) => {
  console.log('middleware 1 start')
  await next()
  console.log('middleware 1 end')
})

app.use(async (ctx, next) => {
  console.log('middleware 2 start')
  await next()
  console.log('middleware 2 end')
})

app.use(async (ctx, next) => {
  setTimeout(console.log.bind(console, 'timeout A'));

  process.nextTick(console.log.bind(console, 'nextTick A'));

  setImmediate(console.log.bind(console, 'setImmediate A'));

  Promise.resolve().then(console.log.bind(console, 'promise0'))

  Promise.resolve().then(() => {
    console.log.bind(console, 'promise1')()
    process.nextTick(console.log.bind(console, 'nextTick C'))
    console.log.bind(console, 'promise2')()
  });
  Promise.resolve().then(console.log.bind(console, 'promise3'))

  process.nextTick(console.log.bind(console, 'nextTick B'));

  setImmediate(console.log.bind(console, 'setImmediate B'));

  setTimeout(console.log.bind(console, 'timeout B'));

  console.log("Hello World")
})

app.listen( 8070 )