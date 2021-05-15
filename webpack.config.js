const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const WebpackBar = require('webpackbar');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  externals: [nodeExternals()],
  devtool: 'nosources-source-map',
  optimization: {
    minimize: !slsw.lib.webpack.isLocal,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ],
    usedExports: true
  },
  node: {
    __dirname: false
  },
  resolve: {
    plugins: [new TSConfigPathsPlugin()],
    extensions: ['.ts', '.js'],
    modules: ['./node_modules']
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: slsw.lib.webpack.isLocal ? '[absolute-resource-path]' : undefined
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [new WebpackBar(), new ForkTsCheckerWebpackPlugin()]
};
