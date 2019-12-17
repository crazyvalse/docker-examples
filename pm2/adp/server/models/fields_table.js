'use strict'

module.exports = {
  user: ['userName', 'authToken', 'expire'],
  app: ['_id', 'name', 'appId', 'backendUrl', 'previewImgUrl', 'previewIcon', 'configs', 'columns', 'updateAt', 'group'],
  column: ['id', 'name', 'pid', 'type', 'key'],
  appConfigs: ['_id', 'name', 'appId', 'backendUrl', 'configs'],
  appTemplates: ['_id', 'name', 'appId', 'backendUrl']
}
