const crypto = require('crypto');
const { TELCODE_ERROR } = require("../constUtils");
const { returnRes } = require("../utils");

exports = module.exports = {
    async registerController (req, res) {
        let params = req.body;
        let tel_code = req.session.tel_code;
        let cookie_tel_code = req.cookies.tel_code;
        tel_code = tel_code && JSON.parse(tel_code)[cookie_tel_code];
        if (tel_code != params.tel_code) {
            return returnRes(res, '手机验证码错误', TELCODE_ERROR);
        }
        return returnRes(res, params);
    }
};
