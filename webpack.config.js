const path = require("path");

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.ts?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist")
  },
  plugins: [],
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000,
  }
};

