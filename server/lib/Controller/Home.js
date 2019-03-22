const { jsonReturn, jsonError } = require('./utils');
const { activeGoods, hotGoods, basicGoods } = require('../Model/Goods');

exports = module.exports = {
    async getHomeData (req, res) {
        const activeGoodsList = await activeGoods(req.session.member_id);
        const hotGoodsList = await hotGoods(req.session.member_id);
        const basicGoodsList = await basicGoods(req.session.member_id);
        if (req.session.auth_token) {
            console.log(req.session.auth_token);
        }
        res.json(jsonReturn({activeGoodsList, hotGoodsList, basicGoodsList}))
    }
};

