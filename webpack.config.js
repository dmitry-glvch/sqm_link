import { resolve } from 'path'
import dirname from 'es-dirname'

import HtmlPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin as VuePlugin } from 'vue-loader'

import aliases from './webpack-aliases.js'


export default (_, argv) => ({

  entry: {
    main: './source/main.js'
  },

  output: {
    path: resolve(dirname(), 'build')
  },

  resolve: {
    alias: aliases([
      'asset',
      'source',
      'asset/config',
      'asset/image',
      'source/style',
      'source/page',
      'source/component',
      'source/util'
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
        use: 'vue-loader'
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
