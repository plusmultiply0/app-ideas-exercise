const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        app: './src/index.js',
    },

    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Carousel',
        }),
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js",
        // publicPath: '../assets/pics/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options:{
                            modules:true,
                        },
                    },
                ],
            },
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/i,
            //     use:[
            //         {
            //             loader:'file-loader',
            //         },
            //     ],
            //     // options:{
            //     //     publicPath:'assets/pics/'
            //     // }
            // },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 81920,
                            // outputPath: 'assets/pics/',
                        },
                    },
                ],
            },
        ],
    }
}