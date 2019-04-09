const { returnRes } = require("../utils");
const { getActiyityGoodsModel, basicGoods, hotGoods, likeGoods } = require("../Model/Goods");
exports = module.exports = {
    async getActiyityGoodsController (req, res) {
        let result = await getActiyityGoodsModel();
        if (res) return returnRes(res, result);
        return result;
    },
    async getGoodsListController (req, res) {
        let result = await basicGoods();
        if (res) return returnRes(res, result);
        return result;
    },
    async getHotGoodsController (req, res) {
        let result = await hotGoods();
        if (res) return returnRes(res, result);
        return result;
    },
    async getLikeGoodsController (req, res) {
        let result = await likeGoods();
        if (res) return returnRes(res, result);
        return result;
    }
};