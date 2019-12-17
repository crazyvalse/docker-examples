'use strict'

const _ = require('lodash')
const config = require('config')
const jwt = require('jsonwebtoken')

const util = require('../middleware')
const ft = require('../models/fields_table')
const { UserProxy } = require('../proxy')

const jwtSecret = config.get('jwt.secret')
const jwtExpire = config.get('jwt.expire')

module.exports = class UserController {
  /**
   * 用户登录
   * @param Object ctx
   */

  static async login (ctx) {
    let verifyPassword
    const name = ctx.checkBody('username').notEmpty().value
    const password = ctx.checkBody('password').notEmpty().value

    if (ctx.errors) {
      ctx.body = ctx.util.refail(null, 10001, ctx.errors)
      return
    }

    let user = await UserProxy.getByName(name)

    if (!user) {
      ctx.body = ctx.util.refail('用户不存在')
      return
    }
    verifyPassword = util.bcompare(password, user.password)

    if (!verifyPassword) {
      ctx.body = ctx.util.refail('用户名或密码错误')
      return
    }

    user.authToken = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpire })
    user.userName = user.name
    user.expire = 0
    ctx.body = ctx.util.resuccess(_.pick(user, ft.user))
  }
}
