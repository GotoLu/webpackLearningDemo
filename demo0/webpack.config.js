
module.exports = {
	entry: {
		index: './src/index.js',
		list: './src/list.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name]_[chunkhash:12].js'
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			}
		]
	},
	devServer: {
		contentBase: __dirname + '/dist',
		compress: true,
		port: 9000
	}
}
