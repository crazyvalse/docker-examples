'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

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
  _id: Number,
  name: String,
  key: String,
  pid: Number,
  type: String
}, { _id: false })

schema.add({
  key: String
})

schema.plugin(AutoIncrement)
schema.index({ pid: 1 })

module.exports = mongoose.model('Dictionary', schema)
