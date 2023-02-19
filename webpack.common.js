const path = require("node:path");

module.exports = {
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
              url: false,
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
};
