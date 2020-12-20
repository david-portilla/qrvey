const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry:  [ './src/js/index.js' ],

  // index.js dist file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  module: {
    rules: [
      // linter js
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      // transpile JS ES6
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      // transpile SASS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // extract CSS from JS
          { loader: MiniCSSExtractPlugin.loader },
          // Translates CSS into CommonJS
          { loader: "css-loader" },
          // Compiles Sass to CSS
          { loader: 'sass-loader' },
        ]
      },
      // fixing issues importing fonts, files, ico
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          { loader: 'url-loader', }
        ]
      }
    ]
  },

  // enable watch changes
  watch: true,
  // ignore changes on ../node_modules
  watchOptions: {
    ignored: /node_modules/
  },

  // use plugins
  plugins: [
    // linter scss
    new StylelintPlugin({
      configFile: './.stylelintrc',
      context: 'src/scss',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      emitErrors: true,
      fix: true // auto fix lint css rules
    }),
    // index.html dist file
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.svg'
    }),
    // index.css dist file
    new MiniCSSExtractPlugin({
      filename: "index.css",
    }),
    // sync browser
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      host: 'localhost',
      port: 3000,
      // ./dist directory is being served
      server: { baseDir: [ './dist/' ] }
      // server: { baseDir: [ './src/' ] }
    })
  ],

}
