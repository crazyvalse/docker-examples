const { ConfigLog } = require('../models')

module.exports = class AppProxy {
  static log (app, configs) {
    if (!app || !configs) {
      return null
    }
    const configLog = new ConfigLog({
      app, configs
    })
    return configLog.save()
  }
}
