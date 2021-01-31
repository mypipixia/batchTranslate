const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html"
        })
    ]
}