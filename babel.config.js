module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "95",
          safari: "15",
          "edge": "92",
          firefox: "93",
          node: "current"
        },
        modules: false
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }
  }
};