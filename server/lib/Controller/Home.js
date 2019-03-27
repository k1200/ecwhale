const { promiseAll } = require('../utils');
const { activeGoods, hotGoods, basicGoods, likeGoods } = require('../Model/Goods');

exports = module.exports = {
    async getHomeDataController (req, res) {
        const member_id = req.session.member_id;
        const [activeGoodsList, hotGoodsList, basicGoodsList, likeGoodsList] = await promiseAll([activeGoods(member_id), hotGoods(member_id), basicGoods(member_id), likeGoods(member_id)]);
        if (req.session.auth_token) {
            console.log(`homeController-9-${req.session.auth_token}`);
        }
        res.status(200).json({activeGoodsList, hotGoodsList, basicGoodsList, likeGoodsList})
    }
};

