'use strict'
const fs = require('fs')
const path = require('path')

module.exports = class GroupController {
  static async upload (ctx) {
    var newPath = path.resolve('./public', './uploads')
    var imgName = Date.now() + path.extname(ctx.request.files.file.name)
    var imgPath = newPath + '/' + imgName
    fs.readFile(ctx.request.files.file.path, (err, data) => {
      if (err) {
        return console.error(err)
      }
      fs.writeFile(imgPath, data, err => {
        if (err) {
          return console.error(err)
        }
        // ctx.body = ctx.util.resuccess({
        //   imgUrl: 'imgPath'
        // })
        console.info(2, err)
      })
    })
    ctx.body = ctx.util.resuccess({
      configs: {
        imgUrl: '/uploads/' + imgName
      }
    })
  }
}
