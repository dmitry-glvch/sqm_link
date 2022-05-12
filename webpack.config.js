const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')
const VuePlugin = require('vue-loader').VueLoaderPlugin

const aliases = require('./webpack-aliases.js')


module.exports = (_, argv) => ({

  entry: {
    main: './source/main.js'
  },

  output: {
    path: path.resolve(__dirname, 'build')
  },

  resolve: {
    alias: aliases([
      'asset',
      'source',
      'asset/config',
      'source/style',
      'source/page',
      'source/component'
    ])
  },


  devtool: argv.mode === 'development' ?
      'eval-source-map' :
      undefined,

  devServer: {
    host: 'local-ip',
    open: true,
    watchFiles: [
      'source/**/*',
      'asset/**/*'
    ]
  },


  plugins: [

    new HtmlPlugin({
      template: 'source/page-template.html',
      filename: 'index.html',
      title: 'SQM Link',
    }),

    new VuePlugin()

  ],


  module: {
    rules: [

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.s[ac]ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }

    ]
  }

})
