const db = require('../config/database');
exports = module.exports = {
    /*
    * @params domain
    *
    * @return result 查询结果
    *
    * */
    getShopInfoModel (...params) {
        const sql = "SELECT * FROM ec_shop WHERE domain=?";
        return db.curd(sql, params);
    },
    /*
    * @params name
    * @params member_id
    * @params password
    *
    * @return result 查询结果
    *
    * */
    loginModel (...params) {
        const sql = "SELECT id AS user_id, name, audit_status, phone, sex, data_status FROM ec_member WHERE name=? and recommend_id=? and password=?";
        return db.curd(sql, params)
            .then(res => {
                res[0].data_status = res[0].data_status.data;
                return res;
            })
            .catch(err => err);
    }
};
