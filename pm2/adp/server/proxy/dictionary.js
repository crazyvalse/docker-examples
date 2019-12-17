const { Dictionary } = require('../models')

module.exports = class DictionaryProxy {
  static newAndSave (doc) {
    return new Dictionary(doc).save()
  }

  static findByNameAndPid (name, pid) {
    return Dictionary.findOne({ name, pid })
  }

  static findByPid (pid) {
    return Dictionary.find({ pid: pid, isDeleted: false }, {})
  }

  static findByType (type) {
    return Dictionary.find({ type, isDeleted: false }, {})
  }
}
