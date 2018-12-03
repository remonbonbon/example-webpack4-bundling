const path = require('path');
const _ = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    devtool: isDev ? 'source-map' : 'none',
    entry: [
      './src/index.js',
      './src/index.scss'
    ],
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './bundle.css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: _.compact([
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: isDev,
              },
            },
            isDev ? null : {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDev,
                plugins: [
                  require('cssnano')(),
                ]
              },
            },
            'sass-loader',
          ])
        },
      ]
    },
  };
};
