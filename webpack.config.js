var path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js",
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8090,
        historyApiFallback: true,
        host: 'http://localhost',
        index: "./index.html",
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
            { test: /\.less$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
    ]
};
