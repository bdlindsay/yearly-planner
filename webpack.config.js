var path = require('path');
var webpack = require('webpack');

var APP_DIR = path.resolve(__dirname, "public");

module.exports = {
    entry: ['webpack-hot-middleware/client', APP_DIR + "/app.jsx"],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.jsx?/,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-3']
                }
            }, {
                loader: 'json-loader',
                test: /\.json$/,
                exclude: /node_modules/
            }, {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader'],
                include: path.resolve(__dirname, 'public/styles')
            },
            {
                test: /\.ttf$/,
                loader: 'file?name=public/styles/[name].[ext]'
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            },
            {
                test: /\.png$/,
                loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('development')}})
    ],
    devtool: "source-map"
}
