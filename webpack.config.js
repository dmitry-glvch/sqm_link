import { resolve } from 'path'

import dirname from 'es-dirname'

import webpack from 'webpack'

import HtmlPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin as VuePlugin } from 'vue-loader'
import CssExtractPlugin from 'mini-css-extract-plugin'
import FileManagerPlugin from 'filemanager-webpack-plugin'

import { aliases, replacements } from './webpack-helpers.js'
import branches from './branches.js'


export default (env, args) => ({

  entry: './source/main.js',

  output: {
    path: resolve(dirname(), `build/${env.branch}`)
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
      'source/component/layout',
      'source/util'
    ])
  },


  devtool: args.mode === 'development' ?
      'source-map' :
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
      filename: 'index.html'
    }),

    new VuePlugin(),

    new CssExtractPlugin(),

    new webpack.DefinePlugin({
      defaultRoute: JSON.stringify(
          `/${env.branch === 'super' ? 'north-west' : env.branch}/main`),
      branchNavigation: JSON.stringify(env.branch === 'super'),
      branches: JSON.stringify(
          env.branch === 'super' ? branches : [ env.branch ])
    }),

    ...replacements(env.branch)([
      'systems',
      'configurator'
    ]),

    new FileManagerPlugin ({
      events: {
        onEnd: {
          delete: [
            `build/${env.branch}/*LICENSE*.txt`
          ]
        }
      }
    })

  ],


  module: {
    rules: [

      {
        test: /\.vue$/,
        use: 'vue-loader'
      },

      {
        test: /\.(css|sass|scss)$/,
        use: [
          args.mode === 'production' ?
              CssExtractPlugin.loader :
              'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }

    ]
  }

})
