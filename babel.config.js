module.exports = {
  presets: [
    "@babel/preset-env",
    // "@babel/plugin-transform-modules-commonjs",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
