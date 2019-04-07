const { TELCODE_ERROR } = require("../constUtils");
const { returnRes, createCryptoMd5 } = require("../utils");
const { registerModel } = require("../Model/Register");

exports = module.exports = {
    async registerController (req, res) {
        let params = req.body;
        let params_array = ['code', 'password', 'password_again', 'tel', 'tel_code'];
        let registerError = [];
        params_array.forEach(item => {
            if (!params[item]) {
                registerError.push({ meassage: `${item} 不能为空`, name: item });
            } else if (item === 'password') {
                if (params[item] !== params.password_again) {
                    registerError.push({ meassage: `两次密码不相同，请确认！`, name: item });
                }
            }
        });
        if (registerError.length > 0) {
            return returnRes(res, { error: registerError });
        }

        let tel_code = req.session.tel_code;
        let cookie_tel_code = req.cookies.tel_code;
        tel_code = tel_code && JSON.parse(tel_code)[cookie_tel_code];
        if (+tel_code !== +params.tel_code) {
            return returnRes(res, '手机验证码错误', TELCODE_ERROR);
        }

        params.password = createCryptoMd5(params.password); // md5 加密
        delete params.password_again;
        delete params.code;
        delete params.tel_code;
        let result = await registerModel(params);
        return returnRes(res, result, { meassage: '注册成功', userId: result.insertId });
    }
};
