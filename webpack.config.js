const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const postcssLoaderConfig = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [
        [
          "postcss-preset-env",
          {
            //options
          },
        ],
      ],
    },
  },
};

const config = {
  entry: "./src/index.js",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: false,
    host: "localhost",
    port: 8080, // default 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({ filename: "built.css" }),

    isProduction && new OptimizeCssAssetsWebpackPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          postcssLoaderConfig,
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          postcssLoaderConfig,
          "less-loader",
        ],
      },
      {
        test: /.(jpg|png)$/i,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          esModule: false,
        },
      },
      {
        test: /.html$/,
        loader: "html-withimg-loader",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
