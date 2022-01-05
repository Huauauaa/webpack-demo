const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 2 ** 10,
          esModule: false,
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.html$/,
        // 处理html文件中的图片, 负责引入img, 从而能被url-loader处理
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'awesome webpack',
      template: './public/index.html',
      gitMessage: {
        version: gitRevisionPlugin.version(),
        commithash: gitRevisionPlugin.commithash(),
        branch: gitRevisionPlugin.branch(),
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};
