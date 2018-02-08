var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'www/public/common/js/bundle': './www/public/react-src/index.js',
    'www/private/hackschool/js/bundle': './www/private/hackschool/react-src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js'
  },
  watch: true,
  module: {
    rules: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'env']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: 'www/public/common/js/vendor'
      })
  ]

};
