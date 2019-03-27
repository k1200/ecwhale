const db = require('../config/database');
const { promiseAll } = require('../utils');
const { getGoodsCategoryListByMid, getOnlineActivityGoodsByAids } = require('./utils');

const TYPE_HOT = 1; // 爆款
const TYPE_FLOOR = 2; // 楼层

const getActivity = (member_id) => {
    // table t_activity, t_accessory
    const nowDate = new Date();
    const date = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`;
    const sql = `SELECT activity.id AS aid , activity.ac_begin_time, activity.ac_end_time, accessory.accessory_url, activity.ac_title  
                    FROM t_activity activity 
                    LEFT JOIN t_accessory accessory 
                    ON activity.ac_bg_img_id = accessory.id 
                    WHERE activity.ac_status = 1 
                    AND activity.data_status = 1 
                    AND activity.ac_type = 6 
                    AND activity.dist_member_id = ? 
                    AND activity.ac_begin_time <= '${date}' 
                    AND activity.ac_end_time >= '${date}' 
                    ORDER BY activity.ac_sort ASC`;
    return db.curd(sql, [member_id])
        .then(res => res[0])
        .catch(err => err);
};
const getHotGoodsByFoolr = () => {
    // table t_shop_index_set, t_accessory
    const sql = `SELECT t_shop_index_set.goods_id, t_shop_index_set.goods_category_id, t_shop_index_set.goods_ids, t1.accessory_url as pc_accessory_url, t2.accessory_url as mobile_accessory_url 
                    FROM t_shop_index_set 
                    LEFT JOIN t_accessory AS t1
                    ON t_shop_index_set.pc_ad_img_id = t1.id 
                    LEFT JOIN t_accessory as t2
                    ON t_shop_index_set.mobile_ad_img_id = t2.id
                    WHERE t_shop_index_set.type = ${TYPE_FLOOR} 
                    AND t_shop_index_set.data_status = 1`;
    return db.curd(sql)
        .then(res => {
            const goods_ids = res.map(item => item.goods_ids);
            const hotGoodsByFoolrMap = new Map(res.map(item => [item.goods_category_id, item]));
            return { goods_ids, hotGoodsByFoolrMap};
        })
        .catch(err => err);
};
exports = module.exports = {
    /*
    * @params member_id
    * @return result 查询结果
    *
    * */
    async activeGoods (member_id) {
        let activityGoods = await getActivity(member_id);
        const sql = `SELECT ec_goods.id AS ec_gid, ec_goods.goods_jan_code, ec_goods.ec_sales_price, ec_goods.goods_img_url, ec_goods.ec_goods_name, ec_goods.goods_id, 
                    t_activity_goods.ag_salenum, t_activity_goods.ag_price, t_activity_goods.ag_inventory, t_goods.sale_inventory, t_goods.deliver_area 
                    FROM ec_goods 
                    JOIN t_activity_goods 
                    ON t_activity_goods.ec_ag_goods_id = ec_goods.id 
                    LEFT JOIN t_goods 
                    ON ec_goods.goods_id = t_goods.id 
                    WHERE t_activity_goods.act_id = ${activityGoods.aid} 
                    AND t_activity_goods.ag_status = 1 
                    AND t_activity_goods.data_status = 1 
                    AND t_activity_goods.dist_member_id = ${member_id} 
                    AND ec_goods.member_id = ${member_id} 
                    AND ec_goods.goods_status = 1 
                    AND ec_goods.data_status = 1 
                    AND t_goods.goods_status = 1 
                    AND t_goods.data_status = 1`;
        return db.curd(sql)
            .then(res => (activityGoods.goodsList = res, activityGoods))
            .catch(err => err);
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
            .then(res => res)
            .catch(err => err);
    },
    /*
    * @params member_id
    * @return result 查询结果
    *
    * */
    async basicGoods (member_id) {
        // const onlineActivityGoods = await getOnlineActivityGoodsByAids(member_id);
        const [foolrHotGoods, goodsCategoryList] = await promiseAll([getHotGoodsByFoolr(), getGoodsCategoryListByMid()]);
        const goods_ids = foolrHotGoods.goods_ids;
        const foolrHotGoods_map = foolrHotGoods.hotGoodsByFoolrMap;
        const sql = `SELECT eg.*, g.sale_inventory, g.deliver_area, g.goods_category_id, tgc.parent_id 
                     FROM ec_goods eg 
                     LEFT JOIN t_goods g 
                     ON eg.goods_id = g.id 
                     LEFT JOIN t_goods_category tgc 
                     ON g.goods_category_id = tgc.id 
                     WHERE eg.member_id = ${member_id} 
                     AND g.goods_status = 1 
                     AND g.data_status = 1 
                     AND eg.goods_status = 1 
                     AND eg.data_status = 1 
                     AND tgc.LEVEL = 1 
                     AND tgc.data_status = 1 
                     AND eg.goods_id in (${goods_ids.join()}) 
                     ORDER BY g.goods_category_id ASC, g.sale_inventory DESC`;
        return db.curd(sql)
            .then(res => {
                let resMapArray = null;
                let current_resArray = [];
                let resChildMapArray = null;
                let current_resChildArray = [];

                for (let [index, item] of res.entries()) {

                    if (resMapArray && item.parent_id === resMapArray[0]) {
                        resMapArray[1].push(item);
                    } else {
                        resMapArray && current_resArray.push(resMapArray);
                        resMapArray = [item.parent_id, [item]];
                    }

                    if (resChildMapArray && item.goods_category_id === resChildMapArray[0]) {
                        resChildMapArray[1].push(item);
                    } else {
                        resChildMapArray && current_resChildArray.push(resChildMapArray);
                        resChildMapArray = [item.goods_category_id, [item]];
                    }

                    if (index === res.length - 1) {
                        resMapArray && current_resArray.push(resMapArray);
                        resChildMapArray && current_resChildArray.push(resChildMapArray);
                        resMapArray = resChildMapArray = null;
                    }
                }
                const res_map = new Map(current_resArray);
                const resChild_map = new Map(current_resChildArray);

                for (let item of goodsCategoryList) {
                    item.hotGoods = foolrHotGoods_map.get(item.id);
                    item.allGoods = res_map.get(item.id);
                    for (let child_item of item.child) {
                        child_item.goodsList = resChild_map.get(child_item.id);
                    }
                }
                return goodsCategoryList;
            })
            .catch(err => (console.log(err), err));
    },
    likeGoods (member_id) {
        const sql = `SELECT eg.*, g.sale_inventory, g.deliver_area, g.goods_category_id, tgc.parent_id 
                     FROM ec_goods eg 
                     LEFT JOIN t_goods g 
                     ON eg.goods_id = g.id 
                     LEFT JOIN t_goods_category tgc 
                     ON g.goods_category_id = tgc.id 
                     WHERE eg.member_id = ${member_id} 
                     AND g.goods_status = 1 
                     AND g.data_status = 1 
                     AND eg.goods_status = 1 
                     AND eg.data_status = 1 
                     AND tgc.LEVEL = 1 
                     AND tgc.data_status = 1 
                     ORDER BY g.goods_salenum DESC 
                     LIMIT 8`;
        return db.curd(sql)
            .then(res => res)
            .catch(error => error);
    }
};
