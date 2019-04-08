const { PASSWORD_ERROR } = require("../constUtils");
const { returnRes, createCryptoCipher, createCryptoMd5, getDate } = require("../utils");
const {
    loginModel,
    registerModel } = require("../Model/user");

exports = module.exports = {
    /**
     * @desc 登录
     * @param {object} [cacheData=null] 登录用户的缓存信息
     * */
    async loginController (req, res, cacheData = null) {
        const data = cacheData || req.body;
        data.password = createCryptoMd5(data.password);
        const result = await loginModel(data);
        if (result[0]) {
            console.log(result);
            if (!result[1]) {
                if (cacheData) {
                    return false;
                } else {
                    return returnRes(res, true, '用户名或密码错误，请重新输入！', PASSWORD_ERROR);
                }
            }
            req.session.auth_token = createCryptoMd5(`${getDate().timestamps}-${result[1].id}`);
            let encrypted = createCryptoCipher(JSON.stringify({ username: data.username, password: data.password }), 'kml1200');

            res.cookie('user', encrypted, {
                maxAge: 1000 * 60 * 60 * 2  //设置cookie的保存时间，2个小时为例
            });
            if (cacheData) {
                return true;
            } else {
                return returnRes(res, result);
            }
        } else {
            return returnRes(res, result);
        }

    },

    /**
     * @desc 注册
     * */
    async registerController (req, res) {
        let params = req.body;
        let params_array = ['code', 'password', 'password_again', 'tel', 'tel_code'];
        let registerError = [];
        params_array.forEach(item => {
            if (!params[item]) {
                registerError.push({ message: `${item} 不能为空`, name: item });
            } else if (item === 'password') {
                if (params[item] !== params.password_again) {
                    registerError.push({ message: `两次密码不相同，请确认！`, name: item });
                }
            }
        });

        let tel_code = req.session.tel_code;
        let cookie_tel_code = req.cookies.tel_code;
        tel_code = tel_code && JSON.parse(tel_code)[cookie_tel_code];
        if (+tel_code !== +params.tel_code) {
            registerError.push({ message: `手机验证码错误！`, name: 'tel_code' });
        }

        if (registerError.length > 0) {
            return returnRes(res, true, { error: registerError });
        }

        params.password = createCryptoMd5(params.password); // md5 加密
        let result = await registerModel(params);
        return returnRes(res, result, { message: '注册成功', userId: result[1] });
    }
};