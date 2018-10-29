const glob = require('glob')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const devtool = isProd ? false : 'source-map'
const modules = ['node_modules']
const minimizer = []
const plugins = []

if (isProd) {
  minimizer.push(
    new UglifyJsPlugin({
      sourceMap: true
    })
  )

  plugins.push(
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    })
  )
}

const mode = isProd ? 'production' : 'development'

const entry = glob
  .sync('./src/*.js')
  .filter(file => !/common/.test(file))
  .reduce((fileMap, file) => {
    const nameParts = file.split('/')
    const nameText = nameParts[nameParts.length - 1]
    const name = nameText.split('.')[0]

    fileMap[name] = file

    return fileMap
  }, {})

module.exports = {
  mode,
  entry,
  devtool,
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  plugins,
  resolve: { modules },
  optimization: { minimizer }
}
