const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const makeMPA = () => {
    let entry = {};
    let htmlPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    entryFiles.forEach(entryFile => {
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match[1];
        entry[pageName] = entryFile;
        htmlPlugins.push(
            new HtmlWebpackPlugin({
                title: pageName,
                template: path.join(__dirname, `./src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true
                }
            })
        );
    });
    return {
        entry,
        htmlPlugins
    }
};

const { entry, htmlPlugins } = makeMPA();

module.exports = {
	entry,
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
          {
            loader: 'px2rem-loader', // 要在less-loader之前
            options: {
              remUni: 75,
              remPrecision: 8
            }
          },
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css'
        }),
        new OptimizeCSSAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        })
	].concat(htmlPlugins)
}
