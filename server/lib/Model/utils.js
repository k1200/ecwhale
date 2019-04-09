const db = require('../config/database');
const { sqlReturn, sqlReturnError, getDate } = require('../utils');
const CATEGORY_TABLE = 'k_category';

exports = module.exports = {

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
            .then(res => {
                let parentCategory = new Map();
                for (let value of res) {
                    if (value.parentId === 0) {
                        value.child = [];
                        parentCategory.set(value.id, value);
                    } else {
                        parentCategory.get(value.parentId).child.push([value.id, value]);
                    }
                }
                return sqlReturn([...parentCategory]);
            })
            .catch(error => sqlReturnError(error));
    }
};
