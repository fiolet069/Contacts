const path = require("path");

module.exports = {
    entry: "./wwwroot/Source.js",
    output: {
        path: path.resolve(__dirname, "wwwroot"),
        filename: "Build.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        ]
    }
}