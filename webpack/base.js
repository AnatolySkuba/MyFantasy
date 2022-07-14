const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const package = require("../package.json");

module.exports = {
	mode: "development",
	devtool: "eval-source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
			{
				test: /\.json$/,
				loader: "json-loader",
				type: "javascript/auto",
			},
		],
	},
	resolve: {
		extensions: [".js", ".ts"],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "src/assets/",
					to: "assets/",
				},
			],
		}),
		new webpack.DefinePlugin({
			CANVAS_RENDERER: JSON.stringify(true),
			WEBGL_RENDERER: JSON.stringify(true),
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../src/index.html"),
			filename: "index.html",
			title: package.description,
			inject: "body",
			hot: true,
		}),
	],
};
