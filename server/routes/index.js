const crypto = require('crypto');
const { login: onLogin } = require('../lib/Controller/Login');
const isLogin = (req, res, next) => {
    let { auto_token } = req.session;
    if (!auto_token) {
        const { user: cookieUser } = req.cookies;
        if (!cookieUser) {
            // cookie中 没有用户登录信息 说明 用户没有登录过或登录过期
            // 响应给客户端401错误
            return res.status(401).json({
                msg: 'not login'
            });
        } else {
            // 解密数据  解密方式要和加密时使用的一致
            const decipher = crypto.createDecipher('aes-256-cfb', 'aaron');
            let decrypted = decipher.update(cookieUser, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            onLogin(req, res, JSON.parse(decrypted)).then(result => {
                if (result) {
                    next()
                } else {
                    // cookie auto_token 被修改
                    // 响应给客户端401错误
                    return res.status(401).json({
                        msg: 'not login'
                    });
                }
            })
        }
    } else {
        next();
    }
};

const RouterLogin = require('../lib/Routes/Login');
const RouterHome = require('../lib/Routes/Home');
const RouterUtils = require('../lib/Routes/utils');
module.exports = app => {
    app.use('/', RouterLogin);
    app.use('/', RouterHome);
    app.use(isLogin);
    app.use('/', RouterUtils);
};
