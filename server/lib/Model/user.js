const db = require("../config/database");
const {sqlReturn, sqlReturnError} = require('../utils');
const TABLE = 'k_user';

exports = module.exports = {
    /**
     * @desc 登录操作
     * @returns {promise}
     * */
    loginModel (params) {
        const sql = `SELECT id, username, tel FROM ${TABLE} WHERE username='${params.username}' AND password='${params.password}'`;
        return db.curd(sql)
            .then(res => sqlReturn(res[0]))
            .catch(error => sqlReturnError(error));
    },

    /**
     * @desc 注册用户
     * @returns {promise}
     * */
    registerModel (params) {
        let sql = `INSERT INTO ${TABLE} (username, password, tel, create_date)
                   VALUES ('${params.tel}', '${params.password}', ${params.tel}, '${getMysqlDate()}')`;
        return db.curd(sql)
            .then(res => sqlReturn(res.insertId))
            .catch(error => sqlReturnError(error));
    }
};