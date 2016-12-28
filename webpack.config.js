var webpack = require('webpack');

module.exports = {
  entry: {
    'www/public/common/js/bundle': './www/public/react-src/index.js',
    'www/private/hackschool/bundle': './www/private/hackschool/react-src/index.js'
  },
  output: {
    path: './',
    filename: '[name].js'
  },
  watch: true,
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: 'www/public/common/js/vendor/vendor'
      })
  ]

};
