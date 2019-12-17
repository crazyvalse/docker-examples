'use strict'

const _ = require('lodash')
const ft = require('../models/fields_table')
const util = require('../middleware')
const { AppProxy, ConfigLogProxy } = require('../proxy')

module.exports = class GroupController {
  static async create (ctx) {
    // const uid = ctx.state.user.id
    const name = ctx.checkBody('name').notEmpty().value
    const appId = ctx.checkBody('appId').notEmpty().value
    const backendUrl = ctx.checkBody('backendUrl').notEmpty().value
    const previewImgUrl = ctx.checkBody('previewImgUrl').notEmpty().value
    const previewIcon = ctx.checkBody('previewIcon').notEmpty().value
    const configs = ctx.checkBody('configs').notEmpty().value
    const group = ctx.checkBody('group').notEmpty().value
    const columns = []

    if (ctx.errors) {
      ctx.body = ctx.util.refail(null, 10001, ctx.errors)
      return
    }

    const doc = await AppProxy.findByName(name)

    if (doc) {
      ctx.body = ctx.util.refail(`项目 ${name} 已存在`)
      return
    }

    let app = await AppProxy.newAndSave({ name, appId, backendUrl, previewImgUrl, previewIcon, configs, columns, group })

    ConfigLogProxy.log(app._id, configs)
    ctx.body = ctx.util.resuccess({
      app: _.pick(app, ft.app)
    })
  }

  static async list (ctx) {
    const apps = await AppProxy.findAll()

    ctx.body = ctx.util.resuccess({
      apps: apps.map((app) => _.pick(app, ft.app))
    })
  }

  static async update (ctx) {
    const name = ctx.checkBody('name').notEmpty().value
    const appId = ctx.checkBody('appId').notEmpty().value
    const backendUrl = ctx.checkBody('backendUrl').notEmpty().value
    const previewImgUrl = ctx.checkBody('previewImgUrl').notEmpty().value
    const previewIcon = ctx.checkBody('previewIcon').notEmpty().value
    const configs = ctx.checkBody('configs').notEmpty().value
    const columns = ctx.checkBody('columns').notEmpty().value
    const group = ctx.checkBody('group').notEmpty().value

    // util.filterMap({ name, appId, backendUrl, previewImgUrl, previewIcon, configs })
    const result = await AppProxy.updateById(ctx.params.id, {
      name, appId, backendUrl, previewImgUrl, previewIcon, configs, columns, group
    })
    if (!result) {
      ctx.body = ctx.util.refail(`更新失败`)
      return
    }
    ConfigLogProxy.log(ctx.params.id, configs)
    ctx.body = ctx.util.resuccess()
  }

  static async modify (ctx) {
    const name = ctx.checkBody('name').notEmpty().value
    const appId = ctx.checkBody('appId').notEmpty().value
    const backendUrl = ctx.checkBody('backendUrl').notEmpty().value
    const previewImgUrl = ctx.checkBody('previewImgUrl').notEmpty().value
    const previewIcon = ctx.checkBody('previewIcon').notEmpty().value
    const configs = ctx.checkBody('configs').notEmpty().value
    const columns = ctx.checkBody('columns').notEmpty().value
    const group = ctx.checkBody('group').notEmpty().value

    const result = await AppProxy.updateById(ctx.params.id,
      util.filterMap({ name, appId, backendUrl, previewImgUrl, previewIcon, configs, columns, group }))

    if (!result) {
      ctx.body = ctx.util.refail(`更新失败`)
      return
    }
    ConfigLogProxy.log(ctx.params.id, configs)
    ctx.body = ctx.util.resuccess()
  }

  static async delete (ctx) {
    const result = await AppProxy.updateById(ctx.params.id, {
      isDeleted: true
    })
    if (!result) {
      ctx.body = ctx.util.refail(`更新失败`)
      return
    }
    ctx.body = ctx.util.resuccess()
  }

  static async getAppConfig (ctx) {
    const app = await AppProxy.findById(ctx.params.id)
    ctx.body = ctx.util.resuccess({
      configs: JSON.parse(app.configs)
    })
  }

  static async getApp (ctx) {
    const app = await AppProxy.findById(ctx.params.id)
    ctx.body = ctx.util.resuccess({
      app: _.pick(app, ft.app)
    })
  }

  static async getAllAppConfigs (ctx) {
    const apps = await AppProxy.findAll()

    ctx.body = ctx.util.resuccess({
      apps: apps.map((app) => {
        return _.pick({
          ..._.pick(app, ft.appConfigs),
          configs: JSON.parse(app.configs)
        }, ft.appConfigs)
      })
    })
  }

  static async getAppTemplates (ctx) {
    const apps = await AppProxy.findAll()

    ctx.body = ctx.util.resuccess({
      apps: apps.map((app) => {
        return _.pick(app, ft.appTemplates)
      })
    })
  }

  static async getDefaultConfigs (ctx) {
    const app = await AppProxy.findDefaultConfig()

    ctx.body = ctx.util.resuccess({
      ..._.pick(app, ['configs'])
    })
  }

  // XXX 更新所有配置 - 临时
  static async updateAllConfigs (ctx) {
    const apps = await AppProxy.findAll()
    const configs = ctx.checkBody('configs').notEmpty().value

    if (!configs) {
      ctx.body = ctx.util.refail(`更新失败`)
      return
    }

    await Promise.all(
      [
        ...apps.map((app) => {
          return AppProxy.updateById(app.id, { backendUrl: configs })
        }),
        ...apps.map((app) => {
          return ConfigLogProxy.log(app._id, configs)
        })
      ]
    )
    ctx.body = ctx.util.resuccess()
  }

  static async test (ctx) {
    const name = ctx.checkBody('name').notEmpty().value
    const appId = ctx.checkBody('appId').notEmpty().value
    const backendUrl = ctx.checkBody('backendUrl').notEmpty().value
    const previewImgUrl = ctx.checkBody('previewImgUrl').notEmpty().value
    const previewIcon = ctx.checkBody('previewIcon').notEmpty().value
    const configs = ctx.checkBody('configs').notEmpty().value
    const group = ctx.checkBody('group').notEmpty().value
    const columns = []

    if (ctx.errors) {
      ctx.body = ctx.util.refail(null, 10001, ctx.errors)
      return
    }

    const doc = await AppProxy.findByName(name)

    if (doc) {
      ctx.body = ctx.util.refail(`项目 ${name} 已存在`)
      return
    }

    let app = await AppProxy.newAndSave({ name, appId, backendUrl, previewImgUrl, previewIcon, configs, columns, group })

    ConfigLogProxy.log(app._id, configs)
    ctx.body = ctx.util.resuccess({
      app: _.pick(app, ft.app)
    })
  }
}
