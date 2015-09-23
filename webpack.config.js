module.exports = {
  entry: './src/index.ts',
  externals: {
    "angular2/angular2": 'angular2/angular2'
  },
  output: {
    filename: './dist/awesome-library.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
  }
};