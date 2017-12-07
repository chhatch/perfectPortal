//webpack.config.js
//run command 'webpack' in directory to bundle
const path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/main.js',
    output: {
        filename: "bundle.js",
        path:  "/p/ps/perfectPortal/app"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
               test: /\.css$/,
               loader: 'style-loader'
            }, {
               test: /\.css$/,
               loader: 'css-loader',
               query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
               }
           }
        ]
    },
    resolve: {
        modules: [
            path.resolve("./app"),
            path.resolve("./node_modules")
        ]
},
plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new webpack.ProvidePlugin({
      "ReactDOM": "react-dom",
    }),
],
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    devtool: 'source-map',
};