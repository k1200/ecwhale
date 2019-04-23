const webpackConfig = require("./webpack.config");
module.exports = {
    publicPath:  process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8080' : '',
    configureWebpack: webpackConfig
};