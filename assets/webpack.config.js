const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: [
        path.resolve(__dirname, "src", "index.js"),
        path.resolve(__dirname, "src", "sass", "main.sass")
    ],
    output: {
        path: path.resolve(__dirname, "dist"), // Folder to store generated bundle
        filename: 'bundle.js',  // Name of generated bundle after build
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                    ]
          }
        ]
    },
    plugins: [  // Array of plugins to apply to build chunk
      new HtmlWebpackPlugin({
          template: "./public/index.html",
      }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    devServer: {  // configuration for webpack-dev-server
        hot: true,
        inline: true,
        host: "localhost",
        contentBase: './public',
        watchContentBase: true,
        watchOptions: {
            poll: true
        }
    }
}