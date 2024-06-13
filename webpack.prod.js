const { DefinePlugin } = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new DefinePlugin({
      "process.env.API_URL": '"https://survey-backend-w3vy.onrender.com/api"',
    }),
  ],
});
