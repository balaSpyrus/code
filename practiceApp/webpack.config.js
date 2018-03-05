const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const extractPlugin = new ExtractTextPlugin({
	filename: './assets/css/app.css'
});

const config = {
	context: path.resolve(__dirname, 'src'),  
	entry: {
    // removing 'src' directory from entry point, since 'context' is taking care of that
    app: './app.js'
},
output: {
	path: path.resolve(__dirname, 'dist'),
	filename: './assets/js/[name].bundle.js'
},
module: {
	rules: [
	{
		test: /\.(js|jsx)$/,
		include: /src/,
		exclude: /node_modules/,		
		use: {
			loader: "babel-loader"
		}
	},
	{
		test: /\.scss$/,
		include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
		use: extractPlugin.extract({
			use: ['css-loader', 'sass-loader'],
			fallback: 'style-loader'
		})
	},
	{ test: /\.html$/, use: ['html-loader'] },
	{
		test: /\.(js|jsx)?$/,
		exclude: /node_modules/,
		use: {
			loader: "eslint-loader",
			options: {
				//"formatter": require("eslint-friendly-formatter"),
				"quiet": true,
				"failOnError": false,
				"failOnWarning": false,
				"emitError": false,
				"emitWarning": true,
				"rules": {
					"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
				}
			}
		}		
	}
	]
},
plugins: [extractPlugin,
new HtmlWebpackPlugin({
	template: 'index.html'
})
],
resolve: {
	extensions: ['.js', '.jsx']
},
devServer: {
	contentBase: path.resolve(__dirname, "./dist/assets/media"),
	compress: true,
	port: 8080,
	stats: 'errors-only',
	open: true
},
devtool: 'cheap-module-source-map'
}

module.exports = config;