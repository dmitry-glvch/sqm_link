const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')
const VuePlugin= require('vue-loader').VueLoaderPlugin


const makeAliases = (relativePaths) =>
    Object.fromEntries(
        relativePaths.map((relativePath) => [
          path.basename(relativePath),
          path.resolve(__dirname, relativePath)
        ] ))


module.exports = (_, argv) => ({

  entry: {
    main: './source/main.js'
  },

  output: {
    path: path.resolve(__dirname, 'build')
  },

  resolve: {
    alias: {
      ...makeAliases ([
        'asset',
        'source/style',
        'source/page',
        'source/component'
      ])
    }
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
      template: 'source/index.html'
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
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [ '@vue/babel-plugin-jsx' ]
          }
        }
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
