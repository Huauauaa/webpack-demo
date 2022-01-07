const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [['postcss-preset-env', {}]],
      },
    },
  },
];

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // 启动gzip
    compress: true,
    port: null,
    // 是否自动打开
    open: false,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [...commonCssLoader, 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [...commonCssLoader],
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
      {
        exclude: /\.(css|js|html|s[ac]ss)|png|svg|jpg|gif/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
      /**
       * airbnb --> eslint-config-airbnb-base@14.0.0  eslint-plugin-import@2.25.4 eslint@6.8.0
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          exclude: [
            // \\ for Windows, \/ for Mac OS and Linux
            /node_modules[\\/]core-js/,
            /node_modules[\\/]webpack[\\/]buildin/,
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry',
                corejs: {
                  version: 3,
                },
              },
            ],
          ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
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
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
};
