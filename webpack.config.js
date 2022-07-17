const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const package = require("./package.json");

module.exports = {
	entry: path.resolve(__dirname, "./src/index.ts"),
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
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "phaser",
					enforce: true,
					chunks: "initial",
				},
			},
		},
	},
	resolve: {
		extensions: [".js", ".ts"],
	},
	output: {
		path: path.resolve(__dirname, "./docs"),
		filename: "[name].[chunkhash].js",
		chunkFilename: "[name].[chunkhash].js",
		clean: true,
	},
	devServer: {
		static: path.resolve(__dirname, "./docs"),
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "src/assets/",
					to: "",
				},
			],
		}),
		new webpack.DefinePlugin({
			CANVAS_RENDERER: JSON.stringify(true),
			WEBGL_RENDERER: JSON.stringify(true),
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "./src/index.html"),
			filename: "index.html",
			title: package.description,
			inject: "body",
			hot: true,
		}),
	],
};
