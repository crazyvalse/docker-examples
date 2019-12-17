const Koa = require('koa')
const path = require('path')
const config = require('config')
const koaJwt = require('koa-jwt')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const onerror = require('koa-onerror')
const validate = require('koa-validate')
const { pathToRegexp } = require('path-to-regexp')
const staticCache = require('koa-static-cache')
const middleware = require('./middleware')
const routerConfig = require('./router-config')

const goServer = module.exports = new Koa()
// const uploadConf = config.get('upload')
const jwtSecret = config.get('jwt.secret')

onerror(goServer)
validate(goServer)

goServer
  .use(serve('/dist', '../dist'))
  .use(serve('/public', '../public'))
  // .use(serve('/upload', path.resolve(__dirname, 'config', uploadConf.dir)))
  .use(cors({ credentials: true, maxAge: 2592000 }))
  .use(middleware.util)
  .use(koaJwt({ secret: jwtSecret }).unless((ctx) => {
    if (/^\/adp/.test(ctx.path)) {
      return pathToRegexp([
        '/adp/auth/login',
        '/adp/apps/configs',
        '/adp/apps/templates',
        '/adp/app/:id/configs'
      ]).test(ctx.path)
    }
    return true
  }))
  .use(koaBody({ multipart: true }))
  .use(routerConfig.api.routes())
  .use(routerConfig.api.allowedMethods())

goServer.proxy = config.get('proxy')

/* istanbul ignore if */
if (!module.parent) {
  const port = config.get('port')
  const host = config.get('host')
  // app.use(require('./middlewares/view').render(app))
  goServer.listen(port, host)
  console.log(`server started at http://${host}:${port}`)
}

function serve (prefix, filePath) {
  return staticCache(path.resolve(__dirname, filePath), {
    prefix: prefix,
    gzip: true,
    dynamic: true,
    maxAge: 60 * 60 * 24 * 30
  })
}
