const webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var SplitByPathPlugin = require('webpack-split-by-path');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: __dirname + '/dist',
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        proxy: {
            '/api': {
                target: 'http://backend:80',
                secure: false,
                changeOrigin: true
              }
        }
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["*", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".prod.ts"]
    },

    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: "source-map-loader" },
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=./asserts/[hash].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: "index.html"
        }),
        new CopyWebpackPlugin([
            { from: "./node_modules/react/cjs/react.development.js", to: "./external/react.js" },
            { from: "./node_modules/react-dom/dist/react-dom.js", to: "./external/react-dom.js" },
        ]),
        new SplitByPathPlugin(
            [{ name: 'vendor', path: path.join(__dirname, 'node_modules') }],
            { manifest: 'bundle' }
        ),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};
