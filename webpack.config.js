const path = require('path')

const VuePlugin = require('vue-loader').VueLoaderPlugin

const helpers = require('./webpack-helpers')


module.exports = (_, argv) => ({

  entry: {
    main: './source/main.js'
  },

  output: {
    path: path.resolve(__dirname, 'build')
  },

  resolve: {
    alias: {
      ...helpers.aliases ([
        'asset',
        'asset/config',
        'source/style',
        'source/page',
        'source/component'
      ])
    },
    fallback: {
      'path': require.resolve('path-browserify')
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
    ...helpers.entryPoints({
      template: 'source/page_template.html',
      favicon: 'asset/image/favicon.ico'
    })([
      { file: 'index',        title: 'Главная'     },
      { file: 'systems',      title: 'Инфосистемы' },
      { file: 'forms',        title: 'Формы'       },
      { file: 'configurator', title: 'Конфигуратор'},
      { file: 'instructions', title: 'Инструкции'  },
      { file: 'contacts',     title: 'Контакты'    },
      { file: 'form3ltp',     title: 'Выезд'       }
    ]),
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
