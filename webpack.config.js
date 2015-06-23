var autoprefixer = require('autoprefixer-core');

module.exports = {
  entry: './src/js/index.jsx',
  output: {
    path: './public/js',
    filename: 'index.js'
  },
  resolve: {
    modulesDirectories: [
      './node_modules',
      './src/js',
      './src/less'
    ],
    extensions: ['', '.js', '.jsx', '.less']
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.less$/, loader: 'style!css?-minimize!postcss!less' }
    ]
  },
  postcss: [autoprefixer({
    browsers: ['last 2 version'],
    remove: false
  })]
}