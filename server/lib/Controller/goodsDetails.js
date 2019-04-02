const { promiseAll } = require('../utils');
const { getGoodsDetailsModel } = require('../Model/goodDetails');

exports = module.exports = {
    async getGoodsDetailsController (req, res) {
        const member_id = req.session.member_id;
        const [goodsDetails] = await promiseAll([getGoodsDetailsModel(member_id, req.params.goods_id)]);
        res.status(200).json({goodsDetails})
    }
};