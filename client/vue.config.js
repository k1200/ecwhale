const path = require('path');
module.exports = {
    devServer: {
        host: '1200.ecwhale.com',
        port: '80',
        open: true,
        proxy: {
            '/api': {
                target: 'http://1200.ecwhale.com:3000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '^/api': ''  // 替换target中的请求地址，也就是说，在请求的时候，url用'/api代替'http://ip.taobao.com'
                }
            }
        }
    },
    configureWebpack: {  // 覆盖webpack默认配置的都在这里
        resolve: {   // 配置解析别名
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components'),
                '@s': path.resolve(__dirname, './src/style'),
                '@a': path.resolve(__dirname, './src/assets')
            }
        }
    }
}