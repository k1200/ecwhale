/**
 * 商品详情
 *
 * */
const db = require('../config/database');
const { getOnlineActivityGoodsByAids } = require('./utils');
const { promiseAll } = require('../utils');

exports = module.exports = {
    /*
    * @params member_id
    * @params goods_id t_goods主键id
    * @return result 查询结果
    *
    * */
    async getGoodsDetailsModel (member_id = '', goods_id = '') {
        const sql = `SELECT ec_goods.*, t_goods_tax_category.cross_border_tax as tax, freight_templ_rule.first_amount, g.sale_inventory, g.deliver_area, g.goods_spec,
            g.fax, g.brand_id, g.rough_weight, limit_amount, tax_type, g.goods_spec_unit, g.goods_unit, g.tranport_tmpl, g.goods_category_id, g.free_ship, g.goods_main_photo_urls
                    FROM ec_goods 
                    JOIN t_goods as g
                    ON ec_goods.goods_id = g.id 
                    LEFT JOIN t_goods_tax_category
                    ON g.tax_type = t_goods_tax_category.id 
                    LEFT JOIN freight_templ_rule 
                    ON g.tranport_tmpl = freight_templ_rule.freight_id 
                    WHERE ec_goods.goods_id = ${goods_id} 
                    AND ec_goods.member_id = ${member_id} 
                    AND ec_goods.goods_status = 1 
                    AND ec_goods.data_status = 1 
                    AND freight_templ_rule.del_flg = 0 
                    AND freight_templ_rule.is_default = 1 
                    AND g.goods_status = 1 
                    AND g.data_status = 1`;
        let res = await db.curd(sql)
            .then(res => res)
            .catch(err => (console.log(err), err));
        if (res.length < 0) {
            return '对不起，商品不存在或已取消分销!'
        }
        res = res[0];
        const activityGoods = await getOnlineActivityGoodsByAids(member_id);
        if (Object.prototype.toString.call(activityGoods) === '[object Map]') {
            let activityInfo = activityGoods.get(activityGoods.goods_id);
            if (activityInfo && (activityInfo.sale_inventory > 0) && (res.sale_inventory > 0) && (res.sale_inventory - activityInfo.sale_inventory) >= 0) {
                res.act_goods = true;
                res.act_price = activityInfo.ag_price;
                res.sale_inventory = activityInfo.sale_inventory;
            }
        }
        return res;
    }
};
