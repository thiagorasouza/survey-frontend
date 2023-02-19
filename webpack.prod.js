const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new DefinePlugin({
      "process.env.API_URL": '"https://the-survey-app-api.up.railway.app/api"',
    }),
  ],
});
