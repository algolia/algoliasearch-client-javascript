module.exports = {
  extends: ["algolia/jest", "algolia/typescript"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      { packageDir: "./", devDependencies: true }
    ]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"]
      }
    }
  }
};
