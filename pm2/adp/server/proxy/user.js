const { User } = require('../models')
const whiteList = {
  13888888888: {
    id: 1,
    name: '13888888888',
    password: '$2a$08$iBTfLTr8RshJ10kGT.k0XeKvFQTnoaL/doQ1VfomIGs8ehCDHi732'
  },
  13777777777: {
    id: 2,
    name: '13777777777',
    password: '$2a$08$iBTfLTr8RshJ10kGT.k0XeKvFQTnoaL/doQ1VfomIGs8ehCDHi732'
  },
  13666666666: {
    id: 3,
    name: '13666666666',
    password: '$2a$08$iBTfLTr8RshJ10kGT.k0XeKvFQTnoaL/doQ1VfomIGs8ehCDHi732'
  },
  13555555555: {
    id: 4,
    name: '13555555555',
    password: '$2a$08$iBTfLTr8RshJ10kGT.k0XeKvFQTnoaL/doQ1VfomIGs8ehCDHi732'
  }
}

module.exports = class UserProxy {
  static getByName (userName) {
    // return User.findOne({ name: userName })
    return whiteList[userName]
  }

  static getById (userId) {
    return User.findById(userId)
  }

  static find (query, opt) {
    return User.find(query, {}, opt)
  }
}
