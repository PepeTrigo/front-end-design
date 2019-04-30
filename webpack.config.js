const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/01_HTML.html",
      inject: true,
      chunks: ["index"],
      filename: "01_HTML.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/02_CSS.html",
      inject: true,
      chunks: ["index"],
      filename: "02_CSS.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/03_SASS.html",
      inject: true,
      chunks: ["index"],
      filename: "03_SASS.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/04_OOCSS.html",
      inject: true,
      chunks: ["index"],
      filename: "04_OOCSS.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/05_Fonts.html",
      inject: true,
      chunks: ["index"],
      filename: "05_Fonts.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/06_RWD.html",
      inject: true,
      chunks: ["index"],
      filename: "06_RWD.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/07_Flexbox.html",
      inject: true,
      chunks: ["index"],
      filename: "07_Flexbox.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/08_Grid.html",
      inject: true,
      chunks: ["index"],
      filename: "08_Grid.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/09_WebComponents.html",
      inject: true,
      chunks: ["index"],
      filename: "09_WebComponents.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/10_Animaciones.html",
      inject: true,
      chunks: ["index"],
      filename: "10_Animaciones.html"
    }),
    new CopyWebpackPlugin([{ from: "src/_/images", to: "images" }])
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|oft)$/,
        use: ["file-loader"]
      }
    ]
  }
};
