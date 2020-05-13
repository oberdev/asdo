const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: [
        './src/index.js',
        './src/sass/main.sass'
    ],
    output: {
        filename : '[name].[hash].js',
        path : path.resolve(__dirname, 'dist')
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
          },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    ]
          },
        ]
    },
    plugins: [  // Array of plugins to apply to build chunk
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        }),
        new BundleTracker({
            filename: './dist/webpack-stats.json'
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