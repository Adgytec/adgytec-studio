const postcssGlobalData = require("@csstools/postcss-global-data");

module.exports = {
  plugins: [
    postcssGlobalData({
      files: ["./src/styles/media-queries.css"],
    }),
    require("postcss-custom-media"),
    require("autoprefixer"), // ← now works
  ],
};
