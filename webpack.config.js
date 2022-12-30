import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "node:path";

export default {
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
    ],
  },
  resolve: {
    extensions: ["tsx", "ts", "js"],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [new CleanWebpackPlugin()],
};
