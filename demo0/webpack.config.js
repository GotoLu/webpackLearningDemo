const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		index: './src/index.js',
		list: './src/list.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			}, {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}, {
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			}, {
				test: /\.jpg|gif|png|jpeg$/,
				use: 'file-loader'
			}, {
				test: /\.ttf|otf|fon$/,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			chunks: ['index']
		}),
		new HtmlWebpackPlugin({
			title: 'list',
			filename: 'list.html',
			template: './src/list.html',
			chunks: ['list']
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}
