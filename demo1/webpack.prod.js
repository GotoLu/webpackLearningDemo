const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js',
		list: './src/list.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name]_[chunkhash:8].js'
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			}, {
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}, {
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')
							]
						}
					}
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
            template: path.join(__dirname, './src/index.html'),
            filename: 'index',
            chunks: ['index'],
            inject: true
		}),
		new HtmlWebpackPlugin({
			title: 'list',
			template: path.join(__dirname, './src/list.html'),
			filename: 'list.html',
            chunks: ['list'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css'
        }),
        new OptimizeCSSAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        })
	]
}
