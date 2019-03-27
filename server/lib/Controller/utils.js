const { LOGOUT } = require("../utils");
const crypto = require('crypto');
const { getUserInfoModel, getCartCountModel } = require('../Model/utils');
const { loginController } = require('./Login');
exports = module.exports = {
    async isLoginController (req, res, next) {
        let auto_token = req.session.auth_token;
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
                loginController(req, res, JSON.parse(decrypted)).then(result => {
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
            console.log(`utilsController-33-${auto_token}`);
            next();
        }
    },
    logoutController (req, res) {
        delete req.session.auth_token;
        res.clearCookie('user');
        res.status(200).json({ message: '退出登录', status: LOGOUT })
    },
    async getUserInfoController (req, res) {
        const userInfo = await getUserInfoModel(req.session.member_id, req.params.user_id);
        res.status(200).json(userInfo);
    },
    async getCartCountController (req, res) {
        const cartList = await getCartCountModel(req.session.member_id, req.params.user_id);
        res.status(200).json(cartList);
    }
};
