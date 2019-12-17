/* eslint-disable */
const path = require('path')

module.exports = {
  pluginOptions: {
    quasar: {}
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('@apis', path.resolve('src/apis'))
      .set('@assets', path.resolve('src/assets'))
      .set('@imgs', path.resolve('src/assets/imgs'))
      .set('@components', path.resolve('src/components'))
      .set('@pages', path.resolve('src/pages'))
      .set('@middleware', path.resolve('src/middleware'))
      .set('@configs', path.resolve('./config/default.json'))
      .set('@routerTypes', path.resolve('src/middleware/types/router-types.js'))

    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: {
            progressive: true
          },
        })
    }

    // config
    //   .plugin('provide')
    //   .use(webpack.ProvidePlugin, [{
    //     $: 'jquery',
    //     jQuery: 'jquery'
    //   }])
  },
  configureWebpack: {
    // externals: {
    //   'query': '$'
    // }
  },
  devServer: {
    proxy: {
      '/adp': {
        // target: 'http://172.19.202.182:7300/mock/5de628ccb40ea10021250940/app-design',
        target: 'http://172.19.202.182:5700/adp',
        // target: 'http://localhost:5700/adp',
        // target: 'https://www.easy-mock.com/mock/5d45637752ebb262d0e7d129/wemedia',
        changeOrigin: true,
        secure: false,
        ws: false,
        pathRewrite: {
          '^/adp': '/'
        }
      },
      '/uploads': {
        // target: 'http://172.19.202.182:7300/mock/5de628ccb40ea10021250940/app-design',
        target: 'http://172.19.202.182:8080',
        // target: 'https://www.easy-mock.com/mock/5d45637752ebb262d0e7d129/wemedia',
        changeOrigin: true,
        secure: false,
        ws: false
      }
      // // 设置代理
      // '/we-api': {
      //   target: 'http://gateway.wemedia.dev.fzyun.io',
      //   // target: 'https://www.easy-mock.com/mock/5d45637752ebb262d0e7d129/wemedia',
      //   // target: 'https://wemedia.fzyun.cn',
      //   changeOrigin: true,
      //   secure: false,
      //   ws: false,
      //   pathRewrite: {
      //     '^/we-api': '/'
      //   }
      // },
      // '/we-oss': {
      //   target: 'http://oss.wemedia.dev.fzyun.io', // 'http://oss-wemedia.dev.fzyun.io',    // http://oss.wemedia.dev.fzyun.io/
      //   // target: 'https://www.easy-mock.com/mock/5d45637752ebb262d0e7d129/wemedia',
      //   changeOrigin: true,
      //   secure: false,
      //   ws: false,
      //   pathRewrite: {
      //     '^/we-oss': '/'
      //   }
      // }
    }
  }
}
