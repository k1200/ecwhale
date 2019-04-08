const {} = require("../constUtils");
const { returnRes } = require("../utils");
const { getShopDetailsModel } = require("../Model/shop");
exports = module.exports = {
    /**
     * @desc 获取商城信息
     */
    async getShopDetailsController (req, res) {
        let result = await getShopDetailsModel();
        return returnRes(res, result);
    },
};