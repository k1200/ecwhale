const db = require('../config/database');
const FIRST_LEVEL = 0; //一级商品分类
const SECOND_LEVEL = 1; //二级商品分类

/**
 * 获取商品分类
 */
const getGoodsCategoryList = (level, pid = 0) => {
    // t_goods_category, t_accessory
    level = level >= 0 ? 'AND t_goods_category.level = ' + level : false;
    const sql = `SELECT t_goods_category.id, t_goods_category.parent_id, t_goods_category.category_name, t_accessory.accessory_url 
                    FROM t_goods_category 
                    LEFT JOIN t_accessory 
                    ON t_goods_category.icon_acc_id = t_accessory.id 
                    WHERE t_goods_category.data_status = 1 
                    ${ level ? pid > 0 ? level + 'AND t_goods_category.parent_id = ' + pid : level : '' } 
                    ORDER BY t_goods_category.sort ASC`;
    return db.curd(sql)
        .then(res => res)
        .catch(err => err);
};

/**
 * 获取在线活动id数组
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
    async getUserInfoModel (member_id, user_id) {
        const sql = `SELECT id AS user_id, name, open_mall_status, audit_status, phone, sex, is_open_store, data_status 
                     FROM ec_member 
                     WHERE id = ${user_id} 
                     AND recommend_id= ${member_id}`;
        return db.curd(sql, params)
            .then(res => {
                res[0].is_open_store = res[0].is_open_store.data;
                res[0].data_status = res[0].data_status.data;
                return res;
            })
            .catch(err => err);
    }
};