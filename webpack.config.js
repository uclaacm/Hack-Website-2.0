module.exports = {
  entry: [
    './www/public/react-src/index.js'
  ],
  output: {
    path: 'www/public/common/js',
    filename: 'bundle.js'
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
  devServer: {
    historyApiFallback: true,
    contentBase: './www/public/'
  }
};
