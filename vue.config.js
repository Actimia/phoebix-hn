const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        'src': path.resolve(__dirname, 'src')
      }
    }
  }
}
