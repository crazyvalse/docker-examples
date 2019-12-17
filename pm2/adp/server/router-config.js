'use strict'

const Router = require('koa-router')
const {
  user,
  app,
  dictionary,
  upload
} = require('./controllers')

const apiRouter = new Router({ prefix: '/adp' })

exports.api = apiRouter
  .post('/auth/login', user.login)
  .post('/test', app.test)

  .get('/apps', app.list)
  .get('/apps/configs', app.getAllAppConfigs)
  .get('/apps/templates', app.getAppTemplates)
  .get('/app/:id', app.getApp)
  .get('/app/:id/configs', app.getAppConfig)
  .post('/app', app.create)
  .put('/app/:id', app.update)
  .put('/app/:id/modify', app.modify)
  .delete('/app/:id', app.delete)
  .get('/app/configs/default', app.getDefaultConfigs) // 获得默认配置
  .put('/app/configs/all', app.updateAllConfigs)

  .post('/dictionary', dictionary.create)
  .get('/columns/:pid', dictionary.list)
  .get('/columns/type/:type', dictionary.listByType)
  .post('/upload', upload.upload)
