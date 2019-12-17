'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema({
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
  app: { type: Schema.Types.ObjectId, ref: 'App' },
  configs: String
})

schema.index({ app: 1 })

module.exports = mongoose.model('ConfigLog', schema)
