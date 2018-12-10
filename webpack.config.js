var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
      path: __dirname + '/build',
      filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html', //指定模板路径
        filename: 'index.html', //指定文件名
    })
],
  module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
              plugins: [
                [  "import",{libraryName: "antd", style: 'css'}] // antd按需加载
              ],
              presets: ['es2015', 'react', 'stage-2']
          }
      }, {
          test: /\.css$/,
          loader: "style-loader!css-loader"
      }]
  }
};
