const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')
module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html",
            minify: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname + '/static'), to: "static", globOptions: { ignore: ['.*'] }, info: { minimized: true }, },
                { from: path.resolve(__dirname + '/README.md'), to: "README.md" }
            ],
        }),
    ]
}