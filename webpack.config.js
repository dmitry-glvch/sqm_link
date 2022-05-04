const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')
const VuePlugin= require('vue-loader').VueLoaderPlugin


module.exports = (_, argv) => ({

  entry: {
    main: './source/main.js'
  },

  output: {
    path: path.resolve(__dirname, 'build')
  },

  resolve: {
    alias: {
      asset: path.resolve(__dirname, 'asset'),
      style: path.resolve(__dirname, 'source/style'),
      page:  path.resolve(__dirname, 'source/page')
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
    // new HtmlPlugin({
    //   template: 'source/index.html'
    // }),
    // new HtmlPlugin({
    //   template: 'source/page/main.html',
    //   filename: 'page/main.html'
    // }),
    new HtmlPlugin({
      template: 'source/index2.html'
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
        test: /\.html$/i,
        use: 'html-loader'
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          // 'style-loader',
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }

    ]
  }

})
