'use strict'

const mongoose = require('mongoose')
const config = require('config')

mongoose.Promise = global.Promise
mongoose.connect(config.get('db'), {
  useMongoClient: true,
  poolSize: 20
}, (err) => {
  /* istanbul ignore if */
  if (err) {
    console.error('connect to %s error: ', config.get('db'), err.message)
    process.exit(1)
  }
})

module.exports = {
  User: require('./user'),
  App: require('./app'),
  Dictionary: require('./dictionary'),
  ConfigLog: require('./config_log')
}
