const db = require('../config/database');
const { SQL_ERROR } = require('../constUtils');
const { promiseAll, getMysqlDate, sqlReturn, sqlReturnError, isArray } = require('../utils');
const { getCategoryModel } = require('./utils');
const ACTIVITY_TABLE = 'k_activity';
const ACTIVITYGOODS_TABLE = 'k_activity_goods';
const GOODS_TABLE = 'k_goods';
const CATEGORY_TABLE = 'k_category';

const TYPE_HOT = 1; // 爆款
const TYPE_FLOOR = 2; // 楼层

/**
 * @desc 获取活动对象
 * @table ACTIVITY_TABLE
 * @param {number} [type=2] 活动类型
 * @return {object} promise
 * */
const getActiyityModel = (type = 2) => {
    const sql = `SELECT ac.id AS aid, ac.start_time, ac.end_time, ac.title  
                FROM ${ACTIVITY_TABLE} ac 
                WHERE ac.start_time <= '${getMysqlDate()}' 
                AND ac.end_time >= '${getMysqlDate()}'
                AND ac.status = 1 
                AND ac.type = ${type}`;
    return db.curd(sql).then(res => sqlReturn(res))
        .catch(error => sqlReturnError(error));
};

exports = module.exports = {
    /**
     * @desc 获取活动商品
     * @table ACTIVITYGOODS_TABLE GOODS_TABLE
     * @return {object} promise 包含商品的活动对象
     * */
    async getActiyityGoodsModel () {
        let activity = await getActiyityModel();
        if (!activity[0] || (activity[0] && activity[1].length === 0)) {
            activity[0] && (activity[1] = null);
            return activity;
        }
        activity = activity[1][0];
        const sql = `SELECT g.*, ag.id AS ag_id, ag.price AS ag_price, ag.sales AS ag_sales, ag.inventory AS ag_count, ag.limit AS ag_limit
                    FROM ${ACTIVITYGOODS_TABLE} ag 
                    JOIN ${GOODS_TABLE} g 
                    ON ag.g_id = g.id 
                    WHERE ag.aid = ${activity.aid} 
                    AND g.status = 1`;
        return db.curd(sql).then(res => {
            activity.goods = res;
            return sqlReturn(activity);
        }).catch(error => sqlReturnError(error));
    },

    hotGoods () {
        // table t_shop_index_set, t_accessory
        const sql = `SELECT t_shop_index_set.goods_id, t1.accessory_url as pc_accessory_url, t2.accessory_url as mobile_accessory_url 
                    FROM t_shop_index_set 
                    LEFT JOIN t_accessory AS t1
                    ON t_shop_index_set.pc_ad_img_id = t1.id 
                    LEFT JOIN t_accessory as t2
                    ON t_shop_index_set.mobile_ad_img_id = t2.id
                    WHERE t_shop_index_set.type = ${TYPE_HOT} 
                    AND t_shop_index_set.data_status = 1
                    ORDER BY t_shop_index_set.sort ASC`;
        return db.curd(sql)
            .then(res => sqlReturn(res))
            .catch(error => sqlReturnError(error));
    },
    /*
    * @params member_id
    * @return result 查询结果
    *
    * */
    async basicGoods () {
        const sql = `SELECT g.*, category.parentId AS parent_id 
                     FROM ${GOODS_TABLE} g 
                     LEFT JOIN t_goods tg
                     ON tg.id = g.goods_id 
                     LEFT JOIN ${CATEGORY_TABLE} category
                     ON tg.goods_category_id = category.id 
                     WHERE g.status = 1 
                     AND category.status = 1 
                     AND tg.goods_status = 1 
                     AND tg.data_status = 1
                     ORDER BY g.category ASC, g.sales DESC`;
        return db.curd(sql)
            .then(res => {
                let resMapArray = new Map();
                let current_resArray = null;
                for (let [index, item] of res.entries()) {
                    if (resMapArray.get(item.parent_id)) {
                        resMapArray.get(item.parent_id).push(item)
                    } else {
                        current_resArray = [item];
                        resMapArray.set(item.parent_id, current_resArray)
                    }

                    if (index === res.length - 1) {
                        current_resArray = null;
                    }
                }
                return sqlReturn([...resMapArray]);
            })
            .catch(error => sqlReturnError(error));
    },

    likeGoods () {
        const sql = `SELECT g.*, category.parentId AS parent_id 
                     FROM ${GOODS_TABLE} g 
                     LEFT JOIN ${CATEGORY_TABLE} category
                     ON g.category = category.id 
                     WHERE g.status = 1 
                     ORDER BY g.category ASC, g.sales DESC 
                     LIMIT 8`;
        return db.curd(sql)
            .then(res => sqlReturn(res))
            .catch(error => sqlReturnError(error));
    }
};
