const db = require('../config/database');
const { SQL_ERROR } = require('../constUtils');
const { createError, getMysqlDate } = require('../utils');

exports = module.exports = {
    /**
     * @desc 注册用户
     * @returns {promise}
     * */
    registerModel (params) {
        let sql = `INSERT INTO k_user (username, password, tel, create_date)
                   VALUES ('${params.tel}', '${params.password}', ${params.tel}, '${getMysqlDate()}')`;
        return db.curd(sql)
            .then(res => [true, res])
            .catch(error => [false, createError(SQL_ERROR, error)]);
    }
};
