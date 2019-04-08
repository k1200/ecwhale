const { LOGOUT } = require("../constUtils");
const { returnRes, createError, getDate, createCryptoMd5 } = require("../utils");

const crypto = require('crypto');
const { loginController } = require('./Login');
const {
    getUserInfoModel,
    getCartCountModel,
    addCartModel,
    getGoodsCategoryListByMid,
    isRegisterModel,

    getCategoryModel } = require('../Model/utils');

exports = module.exports = {
    async isLoginController (req, res, next) {
        let auto_token = req.session.auth_token;
        if (!auto_token) {
            const { user: cookieUser } = req.cookies;
            if (!cookieUser) {
                // cookie中 没有用户登录信息 说明 用户没有登录过或登录过期
                // 响应给客户端401错误
                return returnRes(res.status(401), 'not login', LOGOUT);
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
                        return returnRes(res.status(401), 'not login', LOGOUT);
                    }
                })
            }
        } else {
            next();
        }
    },

    /**
     * 以下需在登录状态下
     * */
    logoutController (req, res) {
        delete req.session.auth_token;
        res.clearCookie('user');
        returnRes(res, '退出登录', LOGOUT);
    },
    async getUserInfoController (req, res) {
        const userInfo = await getUserInfoModel(req.session.member_id, req.params.user_id);
        returnRes(res, userInfo);
    },
    async getCartCountController (req, res) {
        const cartList = await getCartCountModel(req.session.member_id, req.params.user_id);
        returnRes(res, cartList);
    },
    async addCartController (req, res) {
        const result = await addCartModel(req.session.member_id, req.headers.ec_member_id, req.query.ec_goods_id, req.query.goods_id, req.query.count);
        returnRes(res, result);
    },

    /**
     * 以下不需要登录状态
     * */
    // 获取产品分类
    // async getCategoryController (req, res) {
    //     const result = await getGoodsCategoryListByMid();
    //     return res.json(result);
    // },

    async isRegisterController (req, res) {
        returnRes(res, req.body);
    },

    async getCategoryController (req, res) {
        const result = await getCategoryModel();
        returnRes(res, result);
    },


    /**
     * @desc 获取手机验证码
     * @param {object} req
     * @param {object} res
     * */
    getTelCodeController (req, res) {
        if (!req.params.tel) res.status(200).json({ status: 1, message: '请输入手机号码'});

        let code = parseInt(Math.random() * 10000); // 模拟手机验证码
        let sessionID = getDate().timestamps;
        sessionID = createCryptoMd5(sessionID);

        let time = 1000 * 60 * 2; // 手机验证码保存2min
        req.session.tel_code = JSON.stringify({[sessionID]: code});
        res.cookie("tel_code", sessionID, {
            maxAge: time
        });

        return returnRes(res, true, { message: '手机验证码获取成功，请注意查收！' + code, time });
    },
    // 获取图形验证码
    getImgCodeController (req, res) {

    },

};
