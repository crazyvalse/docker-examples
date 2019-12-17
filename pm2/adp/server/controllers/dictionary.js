'use strict'

const _ = require('lodash')
const ft = require('../models/fields_table')
const { DictionaryProxy } = require('../proxy')

module.exports = class GroupController {
  static async create (ctx) {
    // const uid = ctx.state.user.id
    const name = ctx.checkBody('name').notEmpty().value
    const pid = ctx.checkBody('pid').notEmpty().value
    const type = ctx.checkBody('type').notEmpty().value
    const key = ctx.checkBody('key').notEmpty().value

    if (ctx.errors) {
      ctx.body = ctx.util.refail(null, 10001, ctx.errors)
      return
    }

    const doc = await DictionaryProxy.findByNameAndPid(name, pid)

    if (doc) {
      ctx.body = ctx.util.refail(`类型 ${name} 已存在`)
      return
    }

    await DictionaryProxy.newAndSave({ name, pid, type, key })

    ctx.body = ctx.util.resuccess()
  }

  static async list (ctx) {
    const docs = await DictionaryProxy.findByPid(ctx.params.pid)
    ctx.body = ctx.util.resuccess({
      dictionary: docs.map((doc) => {
        return {
          ..._.pick(doc, ft.column),
          id: parseInt(doc._id)
        }
      })
    })
  }

  static async listByType (ctx) {
    const docs = await DictionaryProxy.findByType(ctx.params.type)
    ctx.body = ctx.util.resuccess({
      dictionary: docs.map((doc) => {
        return {
          ..._.pick(doc, ft.column),
          id: parseInt(doc._id)
        }
      })
    })
  }
}
