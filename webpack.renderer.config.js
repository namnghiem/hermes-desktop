const rules = require('./webpack.rules');

rules.push({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{ loader: 'babel-loader' }],
})

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.(png|jpe?g|gif|ico|svg)$/, // We will handle of these file extensions
  use: [
    {
      loader: "file-loader",
    }
  ]
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
