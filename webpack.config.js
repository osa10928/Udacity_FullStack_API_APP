const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'sourcemap',
	  entry: './app.js',
	  output: {
	  	path: path.resolve('build', ''),
	  	filename: 'bundle.js'
	  },
	  module: {
      noParse: /node_modules\/knockout\/build\/output\/*.js/,
      loaders: [
        {
          test: /\.html$/, loader: 'html-loader'
        },
	  	  {
	  	  	test: /\.js?$/,
	  	  	exclude: /(node_modules)/,
	  	  	loader: 'babel-loader',
	  	  	query: {
	  	  		presets: ['es2015']
	  	  	}
	  	  },
	  	]
	  },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
};
