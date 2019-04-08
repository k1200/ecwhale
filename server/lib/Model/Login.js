const db = require('../config/database');
exports = module.exports = {

    /**
     * @desc 登录操作
     * */
    loginModel (...params) {
        const sql = "SELECT id AS user_id, username, tel FROM k_user WHERE name=? and recommend_id=? and password=?";
        return db.curd(sql, params)
            .then(res => {
                return res;
            })
            .catch(err => err);
    }
};
