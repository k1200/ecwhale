const db = require('../config/database');
const { sqlReturn, sqlReturnError, getDate } = require('../utils');
const CATEGORY_TABLE = 'k_category';

const FIRST_LEVEL = 0; //一级商品分类
const SECOND_LEVEL = 1; //二级商品分类

/**
 * 获取商品分类
 */
const getGoodsCategoryList = (level, pid = 0) => {
    // t_goods_category, t_accessory
    level = level >= 0 ? 't_goods_category.level = ' + level : false;
    const sql = `SELECT t_goods_category.id, t_goods_category.parent_id, t_goods_category.category_name, t_goods_category.data_status
                    FROM t_goods_category 
                    WHERE ${ level ? pid > 0 ? level + 'AND t_goods_category.parent_id = ' + pid : level : '' } 
                    ORDER BY t_goods_category.sort ASC`;
    return db.curd(sql)
        .then(res => res)
        .catch(err => err);
};

/**
 * 获取在线活动id数组
 * @return map数据
 */
const getOnlineActivityIds = member_id => {
    // table: t_activity
    const nowDate = new Date();
    const date = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`;
    const sql = `SELECT id
                 FROM t_activity 
                 WHERE ac_status = 1 
                 AND data_status = 1 
                 AND dist_member_id = ${member_id} 
                 AND ac_begin_time <= '${date}' 
                 AND ac_end_time >= '${date}'`;
    return db.curd(sql)
        .then(res => res.map(value => value.id))
        .catch(err => err);
};

exports = module.exports = {
    async getGoodsCategoryListByMid () {
        // 商品一级分类列表
        const firstGoodsCategoryList = await getGoodsCategoryList(FIRST_LEVEL);
        // 商品二级分类列表
        const secondGoodsCategoryList = await getGoodsCategoryList(SECOND_LEVEL);
        const firstCategory_map = new Map(firstGoodsCategoryList.map(item => {
            delete item.parent_id;
            item.child = [];
            return [item.id, item];
        }));
        secondGoodsCategoryList.forEach(value => {
            let parent = firstCategory_map.get(value.parent_id);
            parent && parent.child.push(value);
        });
        return firstGoodsCategoryList;
    },
    /**
     * 根据活动id数组获取在线活动商品
     * @return map 数据
     */
    async getOnlineActivityGoodsByAids (member_id) {
        // table: t_activity_goods
        const aids = await getOnlineActivityIds(member_id);
        if (aids.length > 0) {
            const sql = `SELECT eg.goods_jan_code, eg.goods_id, t_activity_goods.ag_price, t_activity_goods.act_id, t_activity_goods.ag_inventory AS ag_inventory 
                    FROM t_activity_goods 
                    JOIN ec_goods as eg 
                    ON t_activity_goods.ec_ag_goods_id = eg.id 
                    JOIN t_goods as g 
                    ON eg.goods_id = g.id
                    WHERE t_activity_goods.act_id IN (${aids}) 
                    AND t_activity_goods.ag_status = 1 
                    AND t_activity_goods.data_status = 1 
                    AND t_activity_goods.dist_member_id = ${member_id} 
                    AND eg.member_id = ${member_id} 
                    AND eg.goods_status = 1 
                    AND eg.data_status  =1 
                    AND g.goods_status = 1 
                    AND g.data_status = 1`;
            return db.curd(sql)
                .then(res => res.map(value => [value.goods_id, {...value}]))
                .catch(err => err);
        }
    },

    /**
     * 获取用户信息
     * */
    async getUserInfoModel (member_id, user_id) {
        const sql = `SELECT id AS user_id, name, audit_status, phone, sex data_status 
                     FROM ec_member 
                     WHERE id = ${user_id} 
                     AND recommend_id= ${member_id}`;
        return db.curd(sql)
            .then(res => {
                // res[0].is_open_store = res[0].is_open_store.data;
                res[0].data_status = res[0].data_status.data;
                return res[0];
            })
            .catch(err => err);
    },

    /**
     * 获取购物车数量
     * */
    async getCartCountModel (member_id, user_id) {
        const sql = `SELECT ec_goods.*, t_goods_cart.id AS cid, t_goods_cart.countnum 
                     FROM t_goods_cart
                     LEFT JOIN ec_goods
                     ON t_goods_cart.goods_id = ec_goods.goods_id
                     WHERE t_goods_cart.ec_member_id = ${user_id} 
                     AND t_goods_cart.data_status = 1 
                     AND ec_goods.member_id = ${member_id}
                     AND ec_goods.goods_status = 1 
                     AND ec_goods.data_status = 1`;
        return db.curd(sql)
            .then(res => res)
            .catch(err => err);
    },

    /**
     * 将商品加入购物车
     * */
    async addCartModel (member_id, user_id, ec_goods_ids, goods_id, count = 1) {

        const haveSql = `SELECT id, countnum
                     FROM t_goods_cart 
                     WHERE ec_goods_id = '${ec_goods_ids}' 
                     AND goods_id = ${goods_id} 
                     AND ec_member_id = ${user_id} 
                     AND member_id = ${member_id} 
                     AND cart_type = 0 
                     AND data_status = 1`;
        const upSql = `UPDATE t_goods_cart SET countnum = ${count}
                       WHERE id = ?`;
        const current_date = getDate().datetime;
        const insetSql = `INSERT INTO t_goods_cart
                        (cart_type, goods_id, member_id, ec_member_id, checked, add_time, countnum, data_status, source, ec_goods_id)
                        VALUE (0, ${goods_id}, ${member_id}, ${user_id}, 1, '${current_date.year + '-' + current_date.month + '-' + current_date.date}',
                         ${count}, 1, 1, '${ec_goods_ids}')`;
        const hasGoods = await db.curd(haveSql).then(res => res).catch(err => console.log(err));
        if (hasGoods.length > 0) {
            return db.curd(upSql, [hasGoods[0].id]).then((res) => (console.log(res), { count: 0 })).catch(err => (console.log(err), err))
        } else {
            return db.curd(insetSql).then(res => (console.log(res), { count: 1 })).catch(err => (console.log(err), err))
        }
    },

    /**
     * @desc 获取产品分类
     * @returns {promise}
     * */
    getCategoryModel () {
        const sql = `SELECT id, parentId, name FROM ${CATEGORY_TABLE} WHERE status = 1`;
        return db.curd(sql)
            .then(res => sqlReturn(res))
            .catch(error => sqlReturnError(error));
    }
};
