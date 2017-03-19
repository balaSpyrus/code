const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'webCont', 'main', 'App.jsx'),
  output: {
    path: path.resolve(__dirname, 'webCont', 'assets'),
    filename: 'bundle.js',
    publicPath: '/webCont/assets/'
      // publicPath: path.resolve(__dirname, 'webCont', 'assets')
    },
    module: {
      loaders: [
      { test: /\.json$/, loader: 'json'}, 
      { test: /\.css$/, loader: "style-loader!css-loader" },
    //  { test: /\.js$/,loader: 'babel',query: {compact: false}},
    {
      loader: 'babel',
      test: /\.jsx$/,
      query: {
        presets: ['es2015', 'react', 'stage-1']
      }
    }, 
    {
      test: /\.ope/,
      loader: "style!css"
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '/index.js', '/index', '/index.jsx']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls:'empty'
  }
};