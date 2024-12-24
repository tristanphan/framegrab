import {resolve} from "path";
import {Configuration} from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: Configuration = {
    entry: {
        background: "./src/background.js",
        page: "./src/page.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    output: {
        path: resolve(__dirname, "dist"),  // Must be absolute path
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: "src/manifest.json", to: "manifest.json"},
                {from: "assets/", to: "assets/"},
            ],
        }),
    ],
    mode: "production",
};

export default config;