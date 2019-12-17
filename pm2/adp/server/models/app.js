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
  isDeleted: {
    type: Boolean,
    default: 0
  },
  name: String,
  appId: String,
  backendUrl: String,
  previewImgUrl: String,
  previewIcon: String,
  configs: String,
  group: Number,
  columns: []
})

schema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model('App', schema)
