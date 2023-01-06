const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("node:path");
const { DefinePlugin } = require("webpack");

module.exports = {
  mode: "development",
  cache: false,
  entry: "./src/main/index.tsx",
  output: {
    path: path.join(__dirname, "public", "js"),
    filename: "bundle.js",
    publicPath: "/public/js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".sass", ".css"],
  },
  externals: {
    react: "React",
    "react-dom/client": "ReactDOM",
  },
  devServer: {
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      "process.env.API_URL": '"http://localhost:5000/api"',
    }),
  ],
};
