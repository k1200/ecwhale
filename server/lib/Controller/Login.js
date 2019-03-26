const { getShopInfoModel, loginModel } = require('../Model/Login');
const crypto = require('crypto');
exports = module.exports = {
    async getShopInfoController (req, res) {
        const result = await getShopInfoModel(req.headers['x-forwarded-host']);
        req.session.member_id = result[0].member_id;
        res.json(result[0]);
    },
    async loginController (req, res, cacheData = null) {
        const data = cacheData || req.body;
        let md5 = crypto.createHash('md5');
        md5.update(data.password);

        const result = await loginModel(data.username, req.session.member_id, md5.digest('hex'));
        if (result.length === 0) {
            if (cacheData) {
                return false;
            } else {
                return res.json({message: '用户名或密码错误，请重新输入！', status: 0, type: 'PASSWORD_ERROR'});
            }
        }

        req.session.auth_token = `${req.session.member_id}_${result[0]}`;

        // createCipher函数接收两个参数
        // 第一个参数为 加密方式
        //const ciphers = crypto.getCiphers();
        //console.log(ciphers); // ['aes-128-cbc', 'aes-128-ccm', ...]
        // 通过上述代码 可以获取到crypto支持的所有加密方式
        //第二个参数为加密向量，也称为 加盐（绝对隐私，解密需要用到）
        const cipher = crypto.createCipher('aes-256-cfb', 'aaron');
        let encrypted = cipher.update(JSON.stringify({username: data.username, password: data.password}), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        res.cookie('user', encrypted, {
            maxAge: 1000 * 60 * 60 * 2  //设置cookie的保存时间，2个小时为例
        });
        if (cacheData) {
            return true;
        } else {
            return res.json(result[0]);
        }
    }
};

