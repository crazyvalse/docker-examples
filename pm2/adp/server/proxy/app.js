const { App } = require('../models')

module.exports = class AppProxy {
  static newAndSave (doc) {
    const app = new App(doc)
    return app.save()
  }

  static findAll () {
    return App.find({ isDeleted: false }, {})
  }

  static updateById (id, doc) {
    return App.update({ _id: id, isDeleted: false }, { $set: doc })
  }

  static findByName (name) {
    return App.findOne({ name })
  }

  static findById (id) {
    return App.findById(id)
  }
  static findDefaultConfig () {
    return App.findOne({ name: '$$DEFAULT$$' })
  }
}
