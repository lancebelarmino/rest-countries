const path = require('path');

module.exports = {
  entry: {
    index: ['regenerator-runtime/runtime.js', './src/js/index.js'],
    country: ['regenerator-runtime/runtime.js', './src/js/country.js'],
    main: ['regenerator-runtime/runtime.js', './src/js/header.js']
  },

  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};