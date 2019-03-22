const db = require('../lib/config/database');
const crypto = require('crypto');
const jsonReturn = (result, msg = '', success = true) => {
    return {result, msg, success};
};
const api = {
    isLogin (req, res, next) {
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
                api.login.login(req, res, JSON.parse(decrypted)).then(result => {
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
    },
    login: {
        async getShopBaseinfo (req, res) {
            const req_header = req.headers;
            const sql = `SELECT * FROM ec_shop WHERE domain='${req_header['x-forwarded-host']}'`;
            const result = await db.curd(sql);
            req.session.member_id = result[0].member_id;
            res.json(jsonReturn({shop_name: result[0].shop_name}));
        },
        async login (req, res, cacheData = null) {
            const data = cacheData || req.body;
            const sql = "SELECT * FROM ec_member WHERE name=? and recommend_id=? and password=?";

            let md5 = crypto.createHash('md5');
            md5.update(data.password);

            const result = await db.curd(sql, [data.username, req.session.member_id, md5.digest('hex')]);
            if (result.length === 0) {
                if (cacheData) {
                    return false;
                } else {
                    return res.json(jsonReturn(null, '用户名或密码错误，请重新输入！', false));
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
                return res.json(jsonReturn(result[0], '登录成功！'));
            }
        },
    },
    home: {

    },

};
module.exports = api;