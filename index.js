const StylableWebpackPlugin = require('stylable-webpack-plugin')

const optimize = dev =>
  dev
    ? {}
    : {
      removeUnusedComponents: true,
      removeComments: true,
      removeStylableDirectives: true,
      classNameOptimizations: true,
      shortNamespaces: true,
      minify: true
    }

module.exports = (config, { _, dev }) => {
  config.plugins.push(
    new StylableWebpackPlugin({
      outputCSS: true,
      includeCSSInJS: false,
      optimize: optimize(dev)
    })
  )

  config.module.rules = config.module.rules.filter(
    rule => !(rule.test || '').toString().includes('css')
  )

  return config
}
