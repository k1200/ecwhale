const db = require("../config/database");
const { sqlReturn, sqlReturnError } = require('../utils');
const TABLE = 'k_shop';

exports = module.exports = {
    /**
     * @desc 获取商城信息
     * @returns {promise}
     */
    getShopDetailsModel () {
        const sql = `SELECT * FROM ${TABLE}`;
        return db.curd(sql)
            .then(res => sqlReturn(res[0]))
            .catch(error => sqlReturnError(error));
    }
};